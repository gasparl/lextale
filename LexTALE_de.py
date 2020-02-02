#!/usr/bin/env python2
# -*- coding: utf-8 -*-
from __future__ import absolute_import, division, print_function, unicode_literals
from psychopy.visual import Window, TextStim, Rect
from psychopy.core import wait, Clock, quit
from psychopy.event import clearEvents, waitKeys, getKeys, Mouse
from psychopy.gui import Dlg
from time import gmtime, strftime
from codecs import open

testing = False # True for testing, False for real recording

if testing:
    fullscreen = False
    escape_key = 'escape'
    instr_wait = 0.1
else:
    escape_key = 'notallowed'
    instr_wait = 0.5
    fullscreen = True

targetkey = 'i'
nontargetkey = 'e'

instruction_color = '#9999FF'
lextale_data = {'corr_nonword': 0, 'corr_word': 0}

# EXECUTE all main functions here
def execute():
    start_input() # prompt to input stuff
    set_screen() # creates psychopy screen and stim objects
    # window opens
    create_file() # created output file

    run_lextale() # begin task & run until finished

    print("************** END OF EXPERIMENT **************")

    ending() # saves demographic & final infos, gives feedback

    waitKeys(keyList = ['b']) # press B to end the exp (prevents subject from closing window)
    quit()

def ending():
    lextale_score = (lextale_data['corr_word'] / 40 * 100 + lextale_data['corr_nonword'] / 20 * 100) / 2;
    lex_sumup = 'correct_responses_to_words\t' + str(lextale_data['corr_word']) + '\ncorrect_responses_to_nonwords\t' + str(lextale_data['corr_nonword']) + '\nlextale_score\t' + str(lextale_score)
    print(lex_sumup)
    data_out.write(lex_sumup)
    info = 'The LexTALE test is completed.'
    data_out.close()
    show_instruction( info )

def set_screen(): # screen properties
    global win, start_text, left_label, right_label, center_disp, instruction_page, left_bg, right_bg, ok_button, ok_text
    win = Window([1280, 1000], color='Black', fullscr = fullscreen, screen = 0, units = 'pix', allowGUI = True) # 1280 1024
    text_left = 'nein'
    text_right = 'ja'
    h_dist = 80
    v_dist = -190
    left_bg = Rect(win, fillColor = 'red', pos = [-h_dist,v_dist-7], width = 130, height = 85)
    right_bg = Rect(win, fillColor = 'green', pos = [h_dist,v_dist-7], width = 130, height = 85)
    left_label = TextStim(win, color='white', font='Verdana', text = text_left, pos = [-h_dist,v_dist], height=50, alignHoriz='center')
    right_label = TextStim(win, color='white', font='Verdana', text = text_right, pos = [h_dist,v_dist], height=50, alignHoriz='center')
    center_disp = TextStim(win, color='white', font='Arial', text = '', height = 55)
    instruction_page = TextStim(win, wrapWidth = 1200, pos = [0, 35], height = 28, font='Verdana', color = instruction_color)
    ok_button = Rect(win, fillColor = 'black', lineColor = instruction_color, pos = [0,-345], width = 80, height = 50)
    ok_text = TextStim(win, text = 'OK', bold = True, color=instruction_color, pos=(0,-345), height = 30)

def start_input():
    global subj_id
    input_box = Dlg(title=u'LexTALE start', labelButtonOK=u'OK', labelButtonCancel=u'Cancel')
    input_box.addText(text=u'')
    input_box.addField(label=u'Subject ID')
    input_box.addText(text=u'')
    input_box.show()
    if input_box.OK:
        subj_num = input_box.data[0]
        subj_id = subj_num + "_" + str(strftime("%Y%m%d%H%M%S", gmtime()))
    else:
        quit()

# create output file, begin writing, reset parameters
def create_file():
    global data_out
    f_name = 'lextale_en_results_' + subj_id + '.txt'
    data_out=open(f_name, 'a', encoding='utf-8')
    data_out.write( '\t'.join( [ "subject_id", "trial_number", "stimulus_shown", "dummy", "real", "response_key", "rt_start", "incorrect", "date_in_ms" ] ) + "\n" )
    print("File created:", f_name)

def add_resp():
    data_out.write( '\t'.join( [ subj_id, str(trial_num+1), stim_text, str(stim_type), str(stim_status), response, str(rt_start*1000), str(incorrect), str(strftime("%Y%m%d%H%M%S", gmtime())) ] ) + '\n' )
    print("resp key:", response, "for stim:", stim_text, "incorrect:", incorrect, "rt_start:", rt_start)

def draw_labels():
    left_bg.draw()
    right_bg.draw()
    left_label.draw()
    right_label.draw()

def show_instruction(instruction_text):
    instruction_page.setText(instruction_text)
    instruction_page.draw()
    win.flip()
    wait(instr_wait)
    inst_resp = waitKeys(keyList = ['space', escape_key])
    end_on_esc(inst_resp[0])

def run_lextale():
    global trial_num, stim_text, stim_type, stim_status, incorrect, response, rt_start
    print("len(blck_itms):", len(lextale_items))
    maus = Mouse()
    instruction_page.setText(lextale_instructions)
    instruction_page.draw()
    ok_button.draw()
    ok_text.draw()
    win.flip()
    while not maus.isPressedIn( ok_button, buttons = [0] ):
        pass

    stopwatch = Clock()
    for trial_num in range(len(lextale_items)): # go through all stimuli of current block
        print("------- Trial number:", trial_num )
        stim_current = lextale_items[trial_num]
        stim_type = stim_current["dummy"]
        stim_text = stim_current["word"]
        stim_status = stim_current["wstatus"]

        center_disp.setText(stim_text)
        draw_labels()
        center_disp.draw()
        win.callOnFlip(stopwatch.reset)
        clearEvents()
        win.flip()
        while True:
            if maus.isPressedIn( right_bg, buttons = [0] ):
                rt_start = stopwatch.getTime()
                response = 'yes'
                right_bg.fillColor = "darkgreen"
                draw_labels()
                center_disp.draw()
                win.flip()
                while maus.isPressedIn( right_bg, buttons = [0] ):
                    pass
                right_bg.fillColor = "green"
                if stim_status == 1:
                    incorrect = 0
                    if stim_type == 0:
                        lextale_data['corr_word'] = lextale_data['corr_word'] + 1
                else:
                    incorrect = 1
                break
            elif maus.isPressedIn( left_bg, buttons = [0] ):
                rt_start = stopwatch.getTime()
                response = 'no'
                left_bg.fillColor = "darkred"
                draw_labels()
                center_disp.draw()
                win.flip()
                while maus.isPressedIn( left_bg, buttons = [0] ):
                    pass
                left_bg.fillColor = "red"
                if stim_status == 0:
                    incorrect = 0
                    if stim_type == 0:
                        lextale_data['corr_nonword'] = lextale_data['corr_nonword'] + 1
                else:
                    incorrect = 1
                break
            elif len(getKeys(keyList=[escape_key], timeStamped=stopwatch)) > 0:
                end_on_esc(escape_key)
                draw_labels()
                center_disp.draw()
                win.flip()
        add_resp() # store trial data


# end session
def end_on_esc(escap):
    if escap == escape_key : # escape
        print("Trying to escape?")
        instruction_page.setText('Sure you want to discontinue and quit the experiment?\n\nPress "y" to quit, or press "n" to continue.')
        instruction_page.draw()
        win.flip()
        wait(instr_wait)
        quit_resp = waitKeys(keyList = ['y', 'n'])
        if quit_resp[0] == 'y':
            print("************ ESCAPED ************")
            data_out.close()
            win.close()
            quit()
        else:
            clearEvents()
            print("Continuing...")

lextale_instructions = 'Dieser Test besteht aus ungefähr 60 Durchgängen, in denen Sie jeweils eine Buchstabenreihe sehen. Ihre Aufgabe ist es, zu entscheiden, ob diese Buchstabenreihe ein existierendes deutsches Wort ist oder nicht. Falls sie glauben, dass es ein deutsches Wort ist, klicken Sie auf "ja", andernfalls auf "nein". \n\nSollten Sie sich sicher sein, dass ein Wort existiert, aber seine Bedeutung nicht kennen, können Sie trotzdem mit "ja" antworten. Sind Sie sich aber unsicher, ob das Wort überhaupt im Deutschen existiert, sollten Sie mit "nein" antworten. \n\nSie haben so viel Zeit wie Sie möchten für jede Antwort. Der Test dauert etwa 5 Minuten. \n\nWenn Sie bereit sind, können Sie selbst das Experiment starten.'

lextale_items = [{
        'word': "WOLLE",
        'wstatus': 1,
        'dummy': 1
    },
    {
        'word': "TERMITÄT",
        'wstatus': 0,
        'dummy': 1
    },
    {
        'word': "ENORM",
        'wstatus': 1,
        'dummy': 1
    },
    {
        'word': "WELSTBAR",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "REUEVOLL",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ZUOBERST",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "RUPPIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "PETURAT",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "KLAGLOS",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ZUGIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "TURBULENZ",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ZEHE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "DEGERATION",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "UNTIEF",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ZÜCHTUNG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "PENSIONAT",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ZAPFEN",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "STAKSIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "STALMEN",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "MALZ",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "FEIGE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "FÜRREN",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "RASEND",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "FEIST",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "KLEMPNER",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "AUSREBEN",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "KANNIBALE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "SCHWACHHEIT",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ERBARMEN",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "VERMASTIGEN",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "SUBVERSIV",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "SATTELN",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "PLANG",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "EIMERWEISE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "SCHEIL",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "STOCKFEST",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "MEHLIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "DÄMMRIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "GAREN",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "TRACHTER",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "ANPROBE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "MONSTRÖS",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "SONITÄT",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "SPEICHERUNG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "MALODIE",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "NARKE",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "STRÄHNE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "DESTILLATION",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "LEUCHTE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "FLINTE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "MACKEL",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "ENTSACHTUNG",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "GEOGRAPH",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "SUMMIERUNG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "WAGHALSIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ZIERDE",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "FAUNIK",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "LUDAL",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "KLAMM",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "DRAUNIG",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "FLISTOR",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "UNSTETIG",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "HERZIG",
        'wstatus': 1,
        'dummy': 0
    }
]

# EXECUTE
execute()
