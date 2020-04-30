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
    document.activeElement.blur();
    if (lextale_items.length > 0) {
        lex_next();
    } else {
        lex_score = (corr_word / 40 * 100 + corr_nonword / 20 * 100) / 2;
        console.log('Correctly identified real words:', corr_word);
        console.log('Correctly identified pseudo words:', corr_nonword);
        console.log('LexTALE score: ' + lex_score + '%');
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
    window.lextale_items = lex_dict[lexlang];
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
    return m.getFullYear() + "" + ("0" + (m.getMonth() + 1)).slice(-2) + "" + ("0" + m.getDate()).slice(-2) + "" + ("0" + m.getHours()).slice(-2) + "" + ("0" + m.getMinutes()).slice(-2) + "" + ("0" + m.getSeconds()).slice(-2);
}


lex_dict = {
    'en': [
        { 'word': 'platery', 'wstatus': 0, 'dummy': 1 },
        { 'word': 'denial', 'wstatus': 1, 'dummy': 1 },
        { 'word': 'generic', 'wstatus': 1, 'dummy': 1 },
        { 'word': 'mensible', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'scornful', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'stoutly', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'ablaze', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'kermshaw', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'moonlit', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'lofty', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'hurricane', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'flaw', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'alberation', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'unkempt', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'breeding', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'festivity', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'screech', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'savoury', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'plaudate', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'shin', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'fluid', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'spaunch', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'allied', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'slain', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'recipient', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'exprate', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'eloquence', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'cleanliness', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'dispatch', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'rebondicate', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'ingenious', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'bewitch', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'skave', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'plaintively', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'kilp', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'interfate', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'hasty', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'lengthy', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'fray', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'crumper', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'upkeep', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'majestic', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'magrity', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'nourishment', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'abergy', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'proom', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'turmoil', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'carbohydrate', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'scholar', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'turtle', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'fellick', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'destription', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'cylinder', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'censorship', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'celestial', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'rascal', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'purrage', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'pulsh', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'muddy', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'quirty', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'pudour', 'wstatus': 0, 'dummy': 0 },
        { 'word': 'listless', 'wstatus': 1, 'dummy': 0 },
        { 'word': 'wrought', 'wstatus': 1, 'dummy': 0 }
    ],
    'de': [
        { 'word': "WOLLE", 'wstatus': 1, 'dummy': 1 },
        { 'word': "TERMITÄT", 'wstatus': 0, 'dummy': 1 },
        { 'word': "ENORM", 'wstatus': 1, 'dummy': 1 },
        { 'word': "WELSTBAR", 'wstatus': 0, 'dummy': 0 },
        { 'word': "REUEVOLL", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ZUOBERST", 'wstatus': 1, 'dummy': 0 },
        { 'word': "RUPPIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "PETURAT", 'wstatus': 0, 'dummy': 0 },
        { 'word': "KLAGLOS", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ZUGIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "TURBULENZ", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ZEHE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "DEGERATION", 'wstatus': 0, 'dummy': 0 },
        { 'word': "UNTIEF", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ZÜCHTUNG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "PENSIONAT", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ZAPFEN", 'wstatus': 1, 'dummy': 0 },
        { 'word': "STAKSIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "STALMEN", 'wstatus': 0, 'dummy': 0 },
        { 'word': "MALZ", 'wstatus': 1, 'dummy': 0 },
        { 'word': "FEIGE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "FÜRREN", 'wstatus': 0, 'dummy': 0 },
        { 'word': "RASEND", 'wstatus': 1, 'dummy': 0 },
        { 'word': "FEIST", 'wstatus': 1, 'dummy': 0 },
        { 'word': "KLEMPNER", 'wstatus': 1, 'dummy': 0 },
        { 'word': "AUSREBEN", 'wstatus': 0, 'dummy': 0 },
        { 'word': "KANNIBALE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "SCHWACHHEIT", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ERBARMEN", 'wstatus': 1, 'dummy': 0 },
        { 'word': "VERMASTIGEN", 'wstatus': 0, 'dummy': 0 },
        { 'word': "SUBVERSIV", 'wstatus': 1, 'dummy': 0 },
        { 'word': "SATTELN", 'wstatus': 1, 'dummy': 0 },
        { 'word': "PLANG", 'wstatus': 0, 'dummy': 0 },
        { 'word': "EIMERWEISE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "SCHEIL", 'wstatus': 0, 'dummy': 0 },
        { 'word': "STOCKFEST", 'wstatus': 0, 'dummy': 0 },
        { 'word': "MEHLIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "DÄMMRIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "GAREN", 'wstatus': 1, 'dummy': 0 },
        { 'word': "TRACHTER", 'wstatus': 0, 'dummy': 0 },
        { 'word': "ANPROBE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "MONSTRÖS", 'wstatus': 1, 'dummy': 0 },
        { 'word': "SONITÄT", 'wstatus': 0, 'dummy': 0 },
        { 'word': "SPEICHERUNG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "MALODIE", 'wstatus': 0, 'dummy': 0 },
        { 'word': "NARKE", 'wstatus': 0, 'dummy': 0 },
        { 'word': "STRÄHNE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "DESTILLATION", 'wstatus': 1, 'dummy': 0 },
        { 'word': "LEUCHTE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "FLINTE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "MACKEL", 'wstatus': 0, 'dummy': 0 },
        { 'word': "ENTSACHTUNG", 'wstatus': 0, 'dummy': 0 },
        { 'word': "GEOGRAPH", 'wstatus': 1, 'dummy': 0 },
        { 'word': "SUMMIERUNG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "WAGHALSIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ZIERDE", 'wstatus': 1, 'dummy': 0 },
        { 'word': "FAUNIK", 'wstatus': 0, 'dummy': 0 },
        { 'word': "LUDAL", 'wstatus': 0, 'dummy': 0 },
        { 'word': "KLAMM", 'wstatus': 1, 'dummy': 0 },
        { 'word': "DRAUNIG", 'wstatus': 0, 'dummy': 0 },
        { 'word': "FLISTOR", 'wstatus': 0, 'dummy': 0 },
        { 'word': "UNSTETIG", 'wstatus': 1, 'dummy': 0 },
        { 'word': "HERZIG", 'wstatus': 1, 'dummy': 0 }
        ],
    'nl': [
        { 'word': "pastitie", 'wstatus': 0, 'dummy': 1 },
        { 'word': "scheur", 'wstatus': 1, 'dummy': 1 },
        { 'word': "fobisch", 'wstatus': 1, 'dummy': 1 },
        { 'word': "markatief", 'wstatus': 0, 'dummy': 0 },
        { 'word': "laakbaar", 'wstatus': 1, 'dummy': 0 },
        { 'word': "slaags", 'wstatus': 1, 'dummy': 0 },
        { 'word': "riant", 'wstatus': 1, 'dummy': 0 },
        { 'word': "joutbaag", 'wstatus': 0, 'dummy': 0 },
        { 'word': "doornat", 'wstatus': 1, 'dummy': 0 },
        { 'word': "woelig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "paviljoen", 'wstatus': 1, 'dummy': 0 },
        { 'word': "doop", 'wstatus': 1, 'dummy': 0 },
        { 'word': "starkatie", 'wstatus': 0, 'dummy': 0 },
        { 'word': "onledig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "toetsing", 'wstatus': 1, 'dummy': 0 },
        { 'word': "affiniteit", 'wstatus': 1, 'dummy': 0 },
        { 'word': "mikken", 'wstatus': 1, 'dummy': 0 },
        { 'word': "knullig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "streuren", 'wstatus': 0, 'dummy': 0 },
        { 'word': "rups", 'wstatus': 1, 'dummy': 0 },
        { 'word': "paars", 'wstatus': 1, 'dummy': 0 },
        { 'word': "speven", 'wstatus': 0, 'dummy': 0 },
        { 'word': "geraakt", 'wstatus': 1, 'dummy': 0 },
        { 'word': "martelaar", 'wstatus': 1, 'dummy': 0 },
        { 'word': "ontpelen", 'wstatus': 0, 'dummy': 0 },
        { 'word': "stagnatie", 'wstatus': 1, 'dummy': 0 },
        { 'word': "dronkenschap", 'wstatus': 1, 'dummy': 0 },
        { 'word': "voornemen", 'wstatus': 1, 'dummy': 0 },
        { 'word': "vertediseren", 'wstatus': 0, 'dummy': 0 },
        { 'word': "normatief", 'wstatus': 1, 'dummy': 0 },
        { 'word': "zetelen", 'wstatus': 1, 'dummy': 0 },
        { 'word': "zolf", 'wstatus': 0, 'dummy': 0 },
        { 'word': "publiekelijk", 'wstatus': 1, 'dummy': 0 },
        { 'word': "vluk", 'wstatus': 0, 'dummy': 0 },
        { 'word': "compromeet", 'wstatus': 0, 'dummy': 0 },
        { 'word': "romig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "getint", 'wstatus': 1, 'dummy': 0 },
        { 'word': "gelovig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "nopen", 'wstatus': 1, 'dummy': 0 },
        { 'word': "kluiper", 'wstatus': 0, 'dummy': 0 },
        { 'word': "geloei", 'wstatus': 1, 'dummy': 0 },
        { 'word': "retorisch", 'wstatus': 1, 'dummy': 0 },
        { 'word': "maliteit", 'wstatus': 0, 'dummy': 0 },
        { 'word': "verspilling", 'wstatus': 1, 'dummy': 0 },
        { 'word': "haperie", 'wstatus': 0, 'dummy': 0 },
        { 'word': "proom", 'wstatus': 0, 'dummy': 0 },
        { 'word': "fornuis", 'wstatus': 1, 'dummy': 0 },
        { 'word': "exploitatie", 'wstatus': 1, 'dummy': 0 },
        { 'word': "acteur", 'wstatus': 1, 'dummy': 0 },
        { 'word': "hengel", 'wstatus': 1, 'dummy': 0 },
        { 'word': "flajoen", 'wstatus': 0, 'dummy': 0 },
        { 'word': "aanhekking", 'wstatus': 0, 'dummy': 0 },
        { 'word': "kazerne", 'wstatus': 1, 'dummy': 0 },
        { 'word': "avonturier", 'wstatus': 1, 'dummy': 0 },
        { 'word': "leurig", 'wstatus': 0, 'dummy': 0 },
        { 'word': "chagrijnig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "bretel", 'wstatus': 1, 'dummy': 0 },
        { 'word': "klengel", 'wstatus': 0, 'dummy': 0 },
        { 'word': "etaal", 'wstatus': 0, 'dummy': 0 },
        { 'word': "matig", 'wstatus': 1, 'dummy': 0 },
        { 'word': "futeur", 'wstatus': 0, 'dummy': 0 },
        { 'word': "onbekwaam", 'wstatus': 1, 'dummy': 0 },
        { 'word': "verguld", 'wstatus': 1, 'dummy': 0 }
    ]
};
