/*jshint esversion: 6 */

let lexlang = 'en'; // English: 'en', German: 'de', Dutch: 'nl', Chinese: 'ch'

function lex_next() {
    window.lexstim_item = lextale_items.shift();
    document.getElementById('lexstim').textContent = lexstim_item.word;
}
let lex_result = 'none';
let corr_word = 0;
let corr_nonword = 0;
// citP.corr_word + '+' + citP.corr_nonword
function lexclick(rexrespd) {
    if (lexstim_item.dummy === 0) {
        if (lexstim_item.wstatus === 1 && rexrespd === 'yes') {
            corr_word++;
        } else if (lexstim_item.wstatus === 0 && rexrespd === 'no') {
            corr_nonword++;
        }
    }
    document.activeElement.blur();
    if (lextale_items.length > 0) {
        lex_next();
    } else {
        lex_result = (corr_word / 40 * 100 + corr_nonword / 20 * 100) / 2;
        document.getElementById('div_lex_main').style.display = 'none';
        document.getElementById('div_end').style.display = 'block';
    }
}


function select_lg() {
    chkd = document.querySelector('input[name="lang"]:checked').value;
    if (chkd) {
        lexlang = chkd;
    }
    document.getElementById('div_start').style.display = 'none';
    document.getElementById('div_lex_intro').style.display = 'block';
    let selects = document.querySelectorAll('.lg_' + lexlang);
    selects.forEach((elem) => {
        elem.style.display = 'block';
    });

}

function lexmain() {
    document.getElementById('div_lex_intro').style.display = 'none';
    document.getElementById('div_lex_main').style.display = 'block';
    lex_next();
}


function copy_to_clip() {
    element = $('<textarea>').appendTo('body').val(cit_data).select();
    document.execCommand("Copy");
    element.remove();
}

function neat_date() {
    var m = new Date();
    return m.getFullYear() + "" +
        ("0" + (m.getMonth() + 1)).slice(-2) + "" +
        ("0" + m.getDate()).slice(-2) + "" +
        ("0" + m.getHours()).slice(-2) + "" +
        ("0" + m.getMinutes()).slice(-2) + "" +
        ("0" + m.getSeconds()).slice(-2);
}


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
];
