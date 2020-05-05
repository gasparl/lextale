/*jshint esversion: 6 */

let lexlang = 'en'; // English: 'en', German: 'de', Dutch: 'nl', Chinese: 'ch1', Chinese incl. English: 'ch2'

let path_imgs = './ch_items/';

document.addEventListener("DOMContentLoaded", function() {
    preload_single('LEXTALE_CH_instructions.png', 'intro_ch');
    basic_times.page_loaded = Date.now();
    document.getElementById('finished_id').addEventListener("touchstart", touchstart, false);
    document.getElementById('finished_id').addEventListener("touchend", touchend, false);
});

let timer;

function touchstart(e) {
    e.preventDefault();
    if (!timer) {
        timer = setTimeout(show_feed, 900);
    }
}

function touchend() {
    if (timer) {
        clearTimeout(timer);
    }
}

function lex_next() {
    window.lexstim_item = lextale_items.shift();
    document.getElementById('lexstim').textContent = lexstim_item.word;
    start_time = Date.now();
}

let basic_times = {};
let full_data;
let corr_word = 0;
let corr_nonword = 0;
// citP.corr_word + '+' + citP.corr_nonword
let start_time = 0;
let bool_dict = {
    0: 'false',
    1: 'true'
};

function lexclick(lexrespd) {
    lexstim_item.response_time = Date.now() - start_time;
    lexstim_item.response = lexrespd;
    console.log(lexstim_item);
    let corrresp = 'no';
    if (lexstim_item.wstatus === 1 && lexrespd === 'yes') {
        corrresp = 'yes';
        if (lexstim_item.dummy === 0) {
            corr_word++;
        }
    } else if (lexstim_item.wstatus === 0 && lexrespd === 'no') {
        corrresp = 'yes';
        if (lexstim_item.dummy === 0) {
            corr_nonword++;
        }
    }
    full_data += [lexstim_item.word,
        bool_dict[lexstim_item.wstatus],
        bool_dict[lexstim_item.dummy],
        lexstim_item.response,
        corrresp,
        lexstim_item.response_time
    ].join('\t') + '\n';

    document.activeElement.blur();
    if (lextale_items.length > 0) {
        lex_next();
    } else {
        let lex_score = (corr_word / 40 * 100 + corr_nonword / 20 * 100) / 2;
        document.getElementById('div_lex_main').style.display = 'none';
        document.getElementById('div_end').style.display = 'block';

        console.log('Correctly identified real words: ' + corr_word +
            '\nCorrectly identified pseudo words: ' + corr_nonword +
            '\nLexTALE score: ' + lex_score + '%');

        document.getElementById('end_summary_id').innerHTML =
            '<span style="font-variant: small-caps;">LexTALE score: <b>' + lex_score.toFixed(2) +
            '%</span></b><br>Correctly identified real words: <b>' + corr_word +
            '</b> (out of 40)<br>Correctly identified pseudo words: <b>' + corr_nonword +
            '</b> (out of 20)' + get_times();
    }
}

function get_times() {
    basic_times.test_end = Date.now();
    console.log(basic_times);
    let t_full = basic_times.test_end - basic_times.intro_shown;
    let t_test = basic_times.test_end - basic_times.test_start;
    return '<br><br>Duration from instruction shown to test completed: ' +
        format_ms(t_full) + '<br>Duration of test part only: ' + format_ms(t_test);
}

function format_ms(milis) {
    var mins = Math.floor(milis / 1000 / 60);
    var secs = Math.round(milis / 1000 - (mins * 60)).toFixed();
    return '<b>' + mins + ' min ' + secs + ' s</b>';
}

function ch_ending() {
    document.getElementById('div_lexch_main').style.display = 'none';
    document.getElementById('div_end').style.display = 'block';
    full_data = 'image\tchecked\tcorrect\n';
    let corr_ch = 0;
    let corr_nonch = 0;
    lextale_items.forEach((dct) => {
        let chekd = document.getElementById(dct.filename + '_cb').checked;
        full_data += dct.filename + '\t' + chekd + '\t';
        if (dct.valid == 1 && chekd == true) {
            corr_ch++;
            full_data += 'yes';
        } else if (dct.valid == 0 && chekd == false) {
            corr_nonch++;
            full_data += 'yes';
        } else {
            full_data += 'no';
        }
        full_data += '\n';
    });
    let lex_score = (corr_ch / 60 * 100 + corr_nonch / 30 * 100) / 2; // same as "(a + 2 * b) / 120"
    console.log('Correctly checked real characters: ' + corr_ch +
        '\nCorrectly not checked pseudo characters: ' + corr_nonch +
        '\nLexTALE_CH score: ' + lex_score + '%');

    document.getElementById('end_summary_id').innerHTML =
        '<span style="font-variant: small-caps;">LexTALE_CH score: <b>' + lex_score.toFixed(2) +
        '%</span></b><br>Correctly <i>checked</i> real characters: <b>' + corr_ch +
        '</b> (out of 60)<br>Correctly <i>not checked</i> pseudo characters: <b>' + corr_nonch +
        '</b> (out of 30)' + get_times();
}

function show_feed() {
    document.getElementById('div_end').style.display = 'none';
    document.getElementById('div_feed').style.display = 'block';
    document.getElementById('full_data_disp').innerHTML = full_data;
}

function images_loaded() {
    console.log('All images loaded.');
    document.getElementById('loading_id').style.display = 'none';
    document.getElementById('startbuttn').style.display = 'block';
}

function fillsrcs_ex(src, i) {
    let chked = "";
    if (i == 0 || i == 3) {
        chked = " checked";
    }
    return '<hr><li><input id="' + src +
        '_cb" type="checkbox" ' + chked + ' disabled> <label for="' + src +
        '_cb">' + (i + 1) +
        '. <img class="question_class" src="" alt="是汉字"></label></li>' +
        '<img class="ch_chars" id="' + src + '" src="" alt="Image could not be loaded!">';
}

function fillsrcs(src, i) {
    return '<hr><li><input id="' + src +
        '_cb" type="checkbox"> <label for="' + src +
        '_cb">' + (i + 1) +
        '. <img class="question_class" src="" alt="是汉字"></label></li>' +
        '<img class="ch_chars" id="' + src + '" src="" alt="Image could not be loaded!">';
}

function select_lg() {
    let chkd = document.querySelector('input[name="lang"]:checked');
    if (chkd) {
        lexlang = chkd.value;
    }
    document.getElementById('div_start').style.display = 'none';
    document.getElementById('div_lex_intro').style.display = 'block';
    let selects;
    if (lexlang.length > 2) {
        document.getElementById('startbuttn').style.marginLeft = '70%';
        document.getElementById('startbuttn').style.display = 'none';
        load_all_ch();
        selects = document.querySelectorAll('.lg_' + lexlang + ', .lg_ch');
    } else {
        full_data = ['word_shown',
            'valid',
            'dummy',
            'response',
            'correct',
            'response_time'
        ].join('\t') + '\n';
        window.lextale_items = lex_dict[lexlang];
        selects = document.querySelectorAll('.lg_' + lexlang);
    }
    selects.forEach((elem) => {
        elem.style.display = 'block';
    });
    basic_times.intro_shown = Date.now();
}

function load_pre_ch() {
    preload_single('LEXTALE_CH_instruction_short1.png', 'intro_ch_short1');
    preload_single('LEXTALE_CH_instruction_bottom.png', 'intro_ch_bottom');
    preload_single('LEXTALE_CH_instruction_short2.png', 'intro_ch_short2');
    preload_single('LEXTALE_CH_instruction_end.png', 'intro_ch_end');
    preload_single('LEXTALE_CH_exampleitem01.png', 'corr1');
    preload_single('LEXTALE_CH_exampleitem04.png', 'corr4');
    let quests = document.querySelectorAll('.question_class');
    quests.forEach((elem) => {
        elem.src = path_imgs + 'LEXTALE_CH_instruction_question.png';
    });
    const example_srcs = ['LEXTALE_CH_exampleitem01.png', 'LEXTALE_CH_exampleitem02.png', 'LEXTALE_CH_exampleitem03.png', 'LEXTALE_CH_exampleitem04.png'];
    document.getElementById('ch_list_examples').innerHTML = example_srcs.map(fillsrcs_ex).join('');
    document.getElementById("LEXTALE_CH_exampleitem01.png").checked = true;
    document.getElementById("LEXTALE_CH_exampleitem04.png").checked = true;
    preloadAll(example_srcs)
        .then(images => console.log("Examples loaded."))
        .catch(err => {
            console.error('Failed', err);
            document.getElementById('loading_id').innerHTML = '<br><b>Failed to load example images! (For proper usage see  <a href="https://github.com/gasparl/lextale" target="_blank">https://github.com/gasparl/lextale</a>. See Console for more information about this specific error.)</b>';
        });
}

function load_all_ch() {
    window.lextale_items = lex_dict.ch;
    const sources = lextale_items.map(dct => dct.filename);
    document.getElementById('ch_list').innerHTML = sources.map(fillsrcs).join('');

    preloadAll(sources)
        .then(images => images_loaded())
        .catch(err => {
            console.error('Failed', err);
            document.getElementById('loading_id').innerHTML = '<br><b>Failed to load test images! (For proper usage see  <a href="https://github.com/gasparl/lextale" target="_blank">https://github.com/gasparl/lextale</a>. See Console for more information about this specific error.)</b>';
        });

    let quests = document.querySelectorAll('.question_class');
    quests.forEach((elem) => {
        elem.src = path_imgs + 'LEXTALE_CH_instruction_question.png';
    });
}

function lexmain() {
    basic_times.test_start = Date.now();
    document.getElementById('div_lex_intro').style.display = 'none';
    if (lexlang.length > 2) {
        document.getElementById('div_lexch_main').style.display = 'block';
        window.scrollTo(0, 0);
    } else {
        document.getElementById('div_lex_main').style.display = 'block';
        lex_next();
    }
}

function copy_to_clip(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

function dl_as_file(filename_to_dl, data_to_dl) {
    let elemx = document.createElement('a');
    elemx.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data_to_dl);
    elemx.download = filename_to_dl;
    elemx.style.display = 'none';
    document.body.appendChild(elemx);
    elemx.click();
    document.body.removeChild(elemx);
}

function neat_date() {
    var m = new Date();
    return m.getFullYear() + "" + ("0" + (m.getMonth() + 1)).slice(-2) + "" + ("0" + m.getDate()).slice(-2) + "" + ("0" + m.getHours()).slice(-2) + "" + ("0" + m.getMinutes()).slice(-2) + "" + ("0" + m.getSeconds()).slice(-2);
}

function preload_single(src, id) {
    const img = document.getElementById(id);
    img.onload = function() {
        console.log("Loaded:", src);
        if (id == 'intro_ch') {
            load_pre_ch();
        }
    };
    img.onerror = function() {
        console.log("Failed:", src);
    };
    img.src = path_imgs + src;
}

const preload = src => new Promise(function(resolve, reject) {
    const img = document.getElementById(src);
    img.onload = function() {
        resolve(img);
    };
    img.onerror = reject;
    img.src = path_imgs + src;
});

const preloadAll = sources => Promise.all(sources.map(preload));
