/*jshint esversion: 6 */

let lexlang = 'en'; // English: 'en', German: 'de', Dutch: 'nl', Chinese: 'ch'

let path_imgs = './ch_items/';

document.addEventListener("DOMContentLoaded", function() {
    preload_single('LEXTALE_CH_instructions.png', 'intro_ch');
});

function lex_next() {
    window.lexstim_item = lextale_items.shift();
    document.getElementById('lexstim').textContent = lexstim_item.word;
}

let full_data;
let corr_word = 0;
let corr_nonword = 0;
// citP.corr_word + '+' + citP.corr_nonword
function lexclick(lexrespd) {
    lexstim_item.response = lexrespd;
    lexstim_item.time = Date.now();
    console.log(lexstim_item);
    if (lexstim_item.dummy === 0) {
        if (lexstim_item.wstatus === 1 && lexrespd === 'yes') {
            corr_word++;
        } else if (lexstim_item.wstatus === 0 && lexrespd === 'no') {
            corr_nonword++;
        }
    }
    full_data += ""; // TODO: add info
    document.activeElement.blur();
    if (lextale_items.length > 0) {
        lex_next();
    } else {
        let lex_score = (corr_word / 40 * 100 + corr_nonword / 20 * 100) / 2;
        document.getElementById('div_lex_main').style.display = 'none';
        document.getElementById('div_end').style.display = 'block';

        console.log('Correctly identified real words: ' + corr_word +
            '\nCorrectly identified pseudo words:' + corr_nonword +
            '\nLexTALE score: ' + lex_score + '%');

        document.getElementById('end_summary_id').innerHTML =
            'LexTALE score: <b>' + lex_score.toFixed(2) +
            '%</b><br>Correctly identified real words: <b>' + corr_word +
            '</b><br>Correctly identified pseudo words: <b>' + corr_nonword + '</b>';
    }
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
        '\nCorrectly not checked pseudo characters:' + corr_nonch +
        '\nLexTALE_CH score: ' + lex_score + '%');

    document.getElementById('end_summary_id').innerHTML =
        'LexTALE_CH score: <b>' + lex_score.toFixed(2) +
        '%</b><br>Correctly <i>checked</i> real characters: <b>' + corr_ch +
        '</b><br>Correctly <i>not checked</i> pseudo characters: <b>' + corr_nonch + '</b>';
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
    chkd = document.querySelector('input[name="lang"]:checked').value;
    if (chkd) {
        lexlang = chkd;
    }
    document.getElementById('div_start').style.display = 'none';
    document.getElementById('div_lex_intro').style.display = 'block';
    let selects;
    if (lexlang.length > 2) {
        document.getElementById('startbuttn').style.marginLeft = '70%';
        load_all_ch();
        selects = document.querySelectorAll('.lg_' + lexlang + ', .lg_ch');
    } else {
        full_data = ""; // TODO: add headers
        window.lextale_items = lex_dict[lexlang];
        selects = document.querySelectorAll('.lg_' + lexlang);
    }
    selects.forEach((elem) => {
        elem.style.display = 'block';
    });
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
}

function load_all_ch() {
    const example_srcs = ['LEXTALE_CH_exampleitem01.png', 'LEXTALE_CH_exampleitem02.png', 'LEXTALE_CH_exampleitem03.png', 'LEXTALE_CH_exampleitem04.png'];
    document.getElementById('ch_list_examples').innerHTML = example_srcs.map(fillsrcs_ex).join('');
    document.getElementById("LEXTALE_CH_exampleitem01.png").checked = true;
    document.getElementById("LEXTALE_CH_exampleitem04.png").checked = true;
    preloadAll(example_srcs)
        .then(images => console.log("Examples loaded."))
        .catch(err => {
            console.error('Failed', err);
            document.getElementById('loading_id').innerHTML = 'Failed to load example images. (For proper usage see  <a href="https://github.com/gasparl/lextale" target="_blank">https://github.com/gasparl/lextale</a>. See Console for more information about this specific error.)';
        });

    window.lextale_items = lex_dict.ch;
    const sources = lextale_items.map(dct => dct.filename);
    document.getElementById('ch_list').innerHTML = sources.map(fillsrcs).join('');

    preloadAll(sources)
        .then(images => images_loaded())
        .catch(err => {
            console.error('Failed', err);
            document.getElementById('loading_id').innerHTML = 'Failed to load images. (For proper usage see  <a href="https://github.com/gasparl/lextale" target="_blank">https://github.com/gasparl/lextale</a>. See Console for more information about this specific error.)';
        });

    let quests = document.querySelectorAll('.question_class');
    quests.forEach((elem) => {
        elem.src = path_imgs + 'LEXTALE_CH_instruction_question.png';
    });
}

function lexmain() {
    document.getElementById('div_lex_intro').style.display = 'none';
    if (lexlang.length > 2) {
        document.getElementById('div_lexch_main').style.display = 'block';
        window.scrollTo(0, 0);
    } else {
        document.getElementById('div_lex_main').style.display = 'block';
        lex_next();
    }
}


function copy_to_clip() {
    element = $('<textarea>').appendTo('body').val(cit_data).select();
    document.execCommand("Copy");
    element.remove();
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
