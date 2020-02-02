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
    text_left = 'nee'
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

lextale_instructions = 'Deze test bestaat uit ongeveer 60 trials. Je krijgt steeds een letterreeks te zien. Jouw taak is om te beslissen of dit een bestaand Nederlands woord is of niet. Als je denkt dat het een bestaand Nederlands woord is klik je op "ja", als je denkt dat het geen bestaand Nederlands woord is klik je op "nee". \n\nAls je er zeker van bent dat het woord bestaat, ook als je niet precies weet wat het betekent, mag je toch met "ja" antwoorden. Maar als je twijfelt of het wel een bestaand woord is, kies dan "nee".\n\nJe hebt zoveel tijd als je wilt voor elke beslissing. Dit deel van het experiment duurt ongeveer 5 minuten. \n\nAls alles duidelijk is kun je het experiment nu starten.'

lextale_items = [{
        'word': "pastitie",
        'wstatus': 0,
        'dummy': 1
    },
    {
        'word': "scheur",
        'wstatus': 1,
        'dummy': 1
    },
    {
        'word': "fobisch",
        'wstatus': 1,
        'dummy': 1
    },
    {
        'word': "markatief",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "laakbaar",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "slaags",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "riant",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "joutbaag",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "doornat",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "woelig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "paviljoen",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "doop",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "starkatie",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "onledig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "toetsing",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "affiniteit",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "mikken",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "knullig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "streuren",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "rups",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "paars",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "speven",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "geraakt",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "martelaar",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "ontpelen",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "stagnatie",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "dronkenschap",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "voornemen",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "vertediseren",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "normatief",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "zetelen",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "zolf",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "publiekelijk",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "vluk",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "compromeet",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "romig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "getint",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "gelovig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "nopen",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "kluiper",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "geloei",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "retorisch",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "maliteit",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "verspilling",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "haperie",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "proom",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "fornuis",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "exploitatie",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "acteur",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "hengel",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "flajoen",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "aanhekking",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "kazerne",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "avonturier",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "leurig",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "chagrijnig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "bretel",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "klengel",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "etaal",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "matig",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "futeur",
        'wstatus': 0,
        'dummy': 0
    },
    {
        'word': "onbekwaam",
        'wstatus': 1,
        'dummy': 0
    },
    {
        'word': "verguld",
        'wstatus': 1,
        'dummy': 0
    }
]

# EXECUTE
execute()
