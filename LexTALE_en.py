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
    text_left = 'no'
    text_right = 'yes'
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


lextale_instructions = 'This test consists of about 60 trials, in each of which you will see a string of letters. Your task is to decide whether this is an existing English word or not.  If you think it is an existing English word, you click on "yes", and if you think it is not an existing English word, you click on "no".\n\nIf you are sure that the word exists, even though you don’t know its exact meaning, you may still respond "yes". But if you are not sure if it is an existing word, you should respond "no". \n\nIn this experiment, we use British English rather than American English spelling. For example: "realise" instead of "realize"; "colour" instead of "color", and so on. Please don’t let this confuse you. This experiment is not about detecting such subtle spelling differences anyway. \n\nYou have as much time as you like for each decision. This part of the experiment will take about 5 minutes.\n\nIf everything is clear, you can now start the experiment.'

lextale_items = [{'word': 'platery', 'wstatus': 0, 'dummy': 1},
    {'word': 'denial', 'wstatus': 1, 'dummy': 1},
    {'word': 'generic', 'wstatus': 1, 'dummy': 1},
    {'word': 'mensible', 'wstatus': 0, 'dummy': 0},
    {'word': 'scornful', 'wstatus': 1, 'dummy': 0},
    {'word': 'stoutly', 'wstatus': 1, 'dummy': 0},
    {'word': 'ablaze', 'wstatus': 1, 'dummy': 0},
    {'word': 'kermshaw', 'wstatus': 0, 'dummy': 0},
    {'word': 'moonlit', 'wstatus': 1, 'dummy': 0},
    {'word': 'lofty', 'wstatus': 1, 'dummy': 0},
    {'word': 'hurricane', 'wstatus': 1, 'dummy': 0},
    {'word': 'flaw', 'wstatus': 1, 'dummy': 0},
    {'word': 'alberation', 'wstatus': 0, 'dummy': 0},
    {'word': 'unkempt', 'wstatus': 1, 'dummy': 0},
    {'word': 'breeding', 'wstatus': 1, 'dummy': 0},
    {'word': 'festivity', 'wstatus': 1, 'dummy': 0},
    {'word': 'screech', 'wstatus': 1, 'dummy': 0},
    {'word': 'savoury', 'wstatus': 1, 'dummy': 0},
    {'word': 'plaudate', 'wstatus': 0, 'dummy': 0},
    {'word': 'shin', 'wstatus': 1, 'dummy': 0},
    {'word': 'fluid', 'wstatus': 1, 'dummy': 0},
    {'word': 'spaunch', 'wstatus': 0, 'dummy': 0},
    {'word': 'allied', 'wstatus': 1, 'dummy': 0},
    {'word': 'slain', 'wstatus': 1, 'dummy': 0},
    {'word': 'recipient', 'wstatus': 1, 'dummy': 0},
    {'word': 'exprate', 'wstatus': 0, 'dummy': 0},
    {'word': 'eloquence', 'wstatus': 1, 'dummy': 0},
    {'word': 'cleanliness', 'wstatus': 1, 'dummy': 0},
    {'word': 'dispatch', 'wstatus': 1, 'dummy': 0},
    {'word': 'rebondicate', 'wstatus': 0, 'dummy': 0},
    {'word': 'ingenious', 'wstatus': 1, 'dummy': 0},
    {'word': 'bewitch', 'wstatus': 1, 'dummy': 0},
    {'word': 'skave', 'wstatus': 0, 'dummy': 0},
    {'word': 'plaintively', 'wstatus': 1, 'dummy': 0},
    {'word': 'kilp', 'wstatus': 0, 'dummy': 0},
    {'word': 'interfate', 'wstatus': 0, 'dummy': 0},
    {'word': 'hasty', 'wstatus': 1, 'dummy': 0},
    {'word': 'lengthy', 'wstatus': 1, 'dummy': 0},
    {'word': 'fray', 'wstatus': 1, 'dummy': 0},
    {'word': 'crumper', 'wstatus': 0, 'dummy': 0},
    {'word': 'upkeep', 'wstatus': 1, 'dummy': 0},
    {'word': 'majestic', 'wstatus': 1, 'dummy': 0},
    {'word': 'magrity', 'wstatus': 0, 'dummy': 0},
    {'word': 'nourishment', 'wstatus': 1, 'dummy': 0},
    {'word': 'abergy', 'wstatus': 0, 'dummy': 0},
    {'word': 'proom', 'wstatus': 0, 'dummy': 0},
    {'word': 'turmoil', 'wstatus': 1, 'dummy': 0},
    {'word': 'carbohydrate', 'wstatus': 1, 'dummy': 0},
    {'word': 'scholar', 'wstatus': 1, 'dummy': 0},
    {'word': 'turtle', 'wstatus': 1, 'dummy': 0},
    {'word': 'fellick', 'wstatus': 0, 'dummy': 0},
    {'word': 'destription', 'wstatus': 0, 'dummy': 0},
    {'word': 'cylinder', 'wstatus': 1, 'dummy': 0},
    {'word': 'censorship', 'wstatus': 1, 'dummy': 0},
    {'word': 'celestial', 'wstatus': 1, 'dummy': 0},
    {'word': 'rascal', 'wstatus': 1, 'dummy': 0},
    {'word': 'purrage', 'wstatus': 0, 'dummy': 0},
    {'word': 'pulsh', 'wstatus': 0, 'dummy': 0},
    {'word': 'muddy', 'wstatus': 1, 'dummy': 0},
    {'word': 'quirty', 'wstatus': 0, 'dummy': 0},
    {'word': 'pudour', 'wstatus': 0, 'dummy': 0},
    {'word': 'listless', 'wstatus': 1, 'dummy': 0},
    {'word': 'wrought', 'wstatus': 1, 'dummy': 0}]

# EXECUTE
execute()
