var menuButtonActivated = false;
let previousButton = "";
var LI = false;

const UN = ["698b821c4bba9df9e6dac89b46d8d12d55aa8698617085ebb6ad7aa4e86c4ba2", //Admin
            "c1144dfca7ce1f5d8311ba7566a3cbcc7f553025a03e5df6a61b0f17d49451bd", //Dan
            "20221aef7b8199c90d84bfda6cabdcf13298824757d54615c275f8951d2692f5", //Shra
            "abd506aca89bb0dfe393a2e5d8033fdd93dcb4a35c6e5dbab9ba371fb2440369" , //Sun
            "e70303f86298c942463b7e88a20dd8cde206219639cce32d26cd88bdf59f1c76", //Tshiam
            "2cfd1bf6c78cb2d1847593a482b1733e922cfa4b2b5fef0b036258e046cffe67", //Ang
            "059f727ac7ff5dcdc2fb071c39101e66a9eb1c08f79fa26fd1ad01f335909130", //Lil
            "b92f91849d855b40496e911e9b3241fbae4a65b92b383b293a00ea32565d6543", //Con
            "1fef1048a3108563f89c3ab1373fc65ea412e3884c0d4f0bad495f29da607485", //Zil
            "7a49d0e37774f8a5296044c04481158b1264d9f7b9a2029223f5c4b139418860", //Sam
            "a2b48b51d07f52ee9d7d8f2a74a6c61895b17870a1badfc27ee50039a9776fa9", //Mat
            "845be676d861d4a2873f01c96e10f6d6e6d7885e089c13794f05e00506a078f4", //Ant
            "814ee05c511d3780ab71666178899643d89dba207046a8753d8ddcef6b6f460f", //Ode
            ];

const UP = ["ab572f60a5aa6309b459cc54296e5eddc7d4023636de4d8dd9e73fd613ca4c2c", //Admin
            "7683a5e6ab51379c9486793bd7c0e0dcf503f24903474802523c49b8ac6afe52", //Dan
            "5974261690314f0b556b68638dfd287c7eabade638055e52b720925e71d1a257", //Shra
            "7be529e5c0ddef59c4489aa7e75fd04a4369b5de75babebc35e856cfdaf48b86", //Sun
            "cf7c835aa842c375a93d9d27500b7ff7093f52f854fb23a00617c935c56dfe00", //Tshiam
            "ca48184cf3c5c9046e7faad788ee505425f7ceb946f8dc2251d0a1f761a38866", //Ang
            "965a561f308a1921e5a16da5d54bea74e0445ea82934ce6e8631fba96e1a51c0", //Lil
            "3d48040de57ce5a94742e5b1fc76ec882add2b7dd1ec52dfb0b181c01ea9ac4d", //Con
            "21b5bfb8fe1f705ea7339e61c102532e177262640a17a92d27eb35434b0c7e1d", //Zil
            "2350c875160d14074b10bc20487197b8999a7e9c07765b68bccdd4732cb576e5", //Sam
            "2e3931dd2453f533e8c440eb7fce52841e94e06e56611439a4eade8b4fc70dbe", //Mat
            "f5136320ad7b478306cddf47508e5cd83ab2ecfd00ef009b2c01ed5575420c7b", //Ant
            "1356ef69c22ad31d33636bf12f1bd2f26ad77cae209a505f21c58ae000d5c06d", //Ode
            ]

function isMobile(){
    const sw = screen.width;
    if (sw <= 768){
        return true
    }
    else{
        return false
    }
}

function loggedIn(){
    if(LI == true){
        LI = true
        document.getElementById('login-div').style.display = 'none';
        document.getElementById('userpageDiv').style.display = 'flex';
    }
}

async function sha256(text){
    const encoder = new TextEncoder;
    const buffer = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex;
}

async function userExists(username, password){
    try{
        const hashUsername = await sha256(username);
        const hashPassword = await sha256(password);

        for(var i = 0; i < UN.length; i++){
        if(hashUsername === UN[i] && hashPassword === UP[i]){
            return true;
            }
        }
    }
    catch (error){
        console.error("Error hashing: ", error);
        return false;
    }
    return false
}

const body = document.body;
const colors = ["#505050", "#50ff50", "#505080", "#808080", "#408080", "#409090", "#9040ff", "#202020", "#303070", ]
let startColor = "000000";
let endColor = "#501090";
const duration = 2500;

function randomColor(){
    const rc = Math.floor(Math.random() * colors.length);
    return colors[rc]
}

function getBackgroundColor(){
    const cs = window.getComputedStyle(body);
    const bgc = cs.getPropertyValue('background-color');

    if(!bgc.startsWith('#')) {
        return rgbToHex(bgc);
    }
    else{
        return bgc;
    }
}

function setBackgroundColor(){
    startColor = getBackgroundColor();
    endColor = randomColor();
    //alert(endColor);
}

function rgbToHex(rgbString){
    const rgbValues = rgbString.match(/(\d+)\s*,\s*(\d+)\s*.\s*(\d+)/);
    const red = parseInt(rgbValues[1], 10).toString(16).padStart(2, '0');
    const green = parseInt(rgbValues[2], 10).toString(16).padStart(2, '0');
    const blue = parseInt(rgbValues[3], 10).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

let start = null;

function animate_background_color(){
    if(start === null) start = performance.now();

    const now = performance.now();
    const progress = (now - start) / duration;

    if (progress < 1) {
        const hex = interpolateColors(startColor, endColor, progress);
        body.style.backgroundColor = hex;
        requestAnimationFrame(animate_background_color);
    }
    else{
        const hex = interpolateColors(startColor, endColor, progress);
        body.style.backgroundColor = hex;
        requestAnimationFrame(animate_background_color);
    }
}

function interpolateColors(startColor, endColor, progress){
    const startRed = parseInt(startColor.substring(1, 3), 16);
    const startGreen = parseInt(startColor.substring(3, 5), 16);
    const startBlue = parseInt(startColor.substring(5, 7), 16);

    const endRed = parseInt(endColor.substring(1, 3), 16);
    const endGreen = parseInt(endColor.substring(3, 5), 16);
    const endBlue = parseInt(endColor.substring(5, 7), 16);

    const red = Math.floor(startRed + (endRed - startRed) * progress);
    const green = Math.floor(startGreen + (endGreen - startGreen) * progress);
    const blue = Math.floor(startBlue + (endBlue - startBlue) * progress);

    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
}

function change_random_background_colour(){
    setBackgroundColor();
    animate_background_color();
    start = null;
}

async function loginSubmitButton(){
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const isUserValid = await userExists(username, password);

    if(isUserValid == true){
        LI = true
        change_random_background_colour()
        if (isMobile() == true){
            document.getElementById('header-div').style.display = 'none';
            document.getElementById('mobile-header-div').style.display = 'flex';
            document.getElementById('login-div').style.display = 'none';
            document.getElementById('userpageDiv').style.display = 'flex';
        }
        else{
            document.getElementById('header-div').style.display = 'none';
            document.getElementById('mobile-header-div').style.display = 'flex';
            document.getElementById('login-div').style.display = 'none';
            document.getElementById('userpageDiv').style.display = 'flex';
        }
    }
    else{
        alert("Username or Password does not match!\nAsk your teacher for Username and Password.")
    }
}

function menuButton(){
    if (menuButtonActivated == false){
        menuButtonActivated = true;
        document.getElementById('sidebar').style.display = 'block';
    }
    else{
        menuButtonActivated = false;
        document.getElementById('sidebar').style.display = 'none';
    }
}

const Files = { shop: {
                        folder_name: "shop",
                        button_name: "Shop",
                        button_id: "shopButton",
                        div_id: "shop_div",
                        message: {guitar_plectrum: {image_directory: "shop/alice_guitar_pics.jpg",
                                                    message_header: "Alice Guitar Pics",
                                                    message_body: "R5 each"}}
                        },
                beginner: {
                            folder_name: "beginner",
                            button_name: "Beginner",
                            button_id: "beginnerButton",
                            div_id: "beginner-div",
                            pieces: {the_guitarists_way: {book_1: {display_name: "The Guitarist's Way: Book 1",
                                                                    file_path: "beginner/The Guitarist's way book1.pdf"},
                                                            book_2: {display_name: "The Guitarist's Way: Book 2",
                                                                    file_path: "beginner/The Guitarist's way book2.pdf"},
                                                            book_3: {display_name: "The Guitarist's Way: Book 3",
                                                                    file_path: "beginner/The Guitarist's way book3.pdf"},
                                                            book_4: {display_name: "The Guitarist's Way: Book 4",
                                                                    file_path: "beginner/The Guitarist's way book4.pdf"}}}
                },
                guitar: {
                        folder_name: "guitar",
                        button_name: "Guitar Pieces",
                        button_id: "guitarPiecesButton",
                        div_id: "guitar-div",
                        pieces: {metallica: {   nothing_else_matters: {display_name: "Metallica: Nothing Else Matters.pdf",
                                                                    file_path: "guitar/Metallica-Nothing_Else_Matters_(arranged_for_one_acoustic_guitar).pdf"
                                                }
                                            },
                                sum41: {pieces: {display_name: "Sum41: Pieces.pdf",
                                                file_path: "guitar/Pieces (Eaysy Guitar and piano duet).pdf"
                                                },
                                        pieces_guitar_piano_duet:   {display_name: "Sum 41: Pieces (Easy Guitar and Piano Duet).pdf",
                                                                        file_path: "guitar/Pieces (Eaysy Guitar and piano duet).pdf"
                                                                    }
                                },
                                u2: {with_or_without_you:   {display_name: "U2: With or Without You.pdf",
                                                                file_path: "guitar/With or Without You Theuns Arranged.pdf"
                                                            }
                                }
                                }
                        },
                trinity_guitar: {
                                folder_name: "Trinity Guitar",
                                button_name: "Trinity Guitar",
                                button_id: "TrinityGuitarButton",
                                div_id: "trinity-guitar-div",
                                pieces: {trinity: { scales_gr_1_to_5: {display_name: "Trinity: Scales Grade 1-5",
                                                                        file_path: "Trinity Guitar/Trinity scales grd 1-5.pdf"},
                                                    grade_1_2020:   {display_name: "Trinity: Grade 1 - 2020",
                                                                        file_path: "Trinity Guitar/Trinity grade 1 - 2020.pdf"},
                                                    grade_2_2020:   {display_name: "Trinity: Grade 2 - 2020",
                                                                        file_path: "Trinity Guitar/Trinity grade 2 - 2020.pdf"},
                                                    grade_3_2020:   {display_name: "Trinity: Grade 3 - 2020",
                                                                        file_path: "Trinity Guitar/Trinity grade 3 - 2020.pdf"},
                                                    grade_4_2010:   {display_name: "Trinity: Grade 4 - 2010",
                                                                        file_path: "Trinity Guitar/Trinity grade 4 - 2010.pdf"},
                                                    grade_5_2010:   {display_name: "Trinity: Grade 5 - 2010",
                                                                        file_path: "Trinity Guitar/Trinity grade 5 - 2010.pdf"},
                                                    grade_6_2010:   {display_name: "Trinity: Grade 6 - 2010",
                                                                        file_path: "Trinity Guitar/Trinity grade 6 - 2010.pdf"},
                                                    grade_7_2010:   {display_name: "Trinity: Grade 7 - 2010",
                                                                        file_path: "Trinity Guitar/Trinity grade 7 - 2010.pdf"},}}},
                trinity_pop_rock:   {
                                    folder_name: "trinity pop rock",
                                    button_name: "Trinity Pop Rock",
                                    button_id: "TrinityPopRockButton",
                                    div_id: "trinity-pop-rock-div",
                                    pieces: { trinity: {trinity_pop_rock_grade_1: { display_name: "Trinity Pop Rock Grade 1",
                                                                                    file_path: "trinity pop rock/ilide.info-pop-ampamp-rock-trinity-grade-1-guitar-pr_50502df21a8874175ac4dc773e931d7e.pdf"},
                                                        trinity_pop_rock_grade_2: { display_name: "Trinity Pop Rock Grade 2",
                                                                                    file_path: "trinity pop rock/ilide.info-pop-ampamp-rock-trinity-grade-2-pr_699853c4f9a71f19a1128598552c179b.pdf"},
                                                        trinity_pop_rock_grade_3: { display_name: "Trinity Pop Rock Grade 3",
                                                                                    file_path: "trinity pop rock/ilide.info-pop-amp-rock-trinity-grade-3-pr_439b98c7b6323e88c9501d5cd2d4532d.pdf"},
                                                        trinity_pop_rock_grade_4: { display_name: "Trinity Pop Rock Grade 4",
                                                                                    file_path: "trinity pop rock/ilide.info-pop-amp-rock-trinity-guitar-grade-4-pr_c1415d71d1cac5641d0d443712a1713e.pdf"},
                                                        trinity_pop_rock_grade_5: { display_name: "Trinity Pop Rock Grade 5",
                                                                                    file_path: "trinity pop rock/ilide.info-pop-amp-rock-trinity-grade-5-pdf-pr_074394d1df35c23e572599796c6b6ef8.pdf"},
                                            },
                                                        
                                    }
                },
                guitar_chords:  {
                                folder_name: "guitar chords",
                                button_name: "Guitar Chords",
                                button_id: "GuitarChordsButton",
                                div_id: "guitar-chords-div",
                                pieces: {chords: {  a_cool_guide_to_guitar_chords: {display_name: "a Cool Guide to Guitar Chords.png",
                                                                                    file_path: "guitar chords/a-cool-guide-to-guitar-chords.png"},
                                                    beginner_guitar_chord_chart:    {display_name: "Beginner Guitar Chord Chart.jpg",
                                                                                    file_path: "guitar chords/Beginner-guitar-chord-chart.jpg"},
                                                    guitar_chord_chart: {display_name: "Guitar Chord Chart.png",
                                                                        file_path: "guitar chords/guitar-chord-chart.png"},
                                                    power_chord_chart_list_pro: {display_name: "Power Chord Chart List Pro.pdf",
                                                                                file_path: "guitar chords/Power-chord-chart-list-guitar-pro.pdf"}}}},
                piano_pieces:   {
                                folder_name: "piano",
                                button_name: "Piano Pieces",
                                button_id: "pianoPiecesButton",
                                div_id: "piano-div",
                                pieces: {the_cranberries: {zombie: {display_name: "the Cranberries: Zombie",
                                                                    file_path: "piano/Zombie-Sheet-Music-The-Cranberries-SheetMusic-Free.com_.pdf"}},
                                        nirvana: { smells_like_teen_spirit: {display_name: "Nirvana: Smells Like Teen Spirit.pdf",
                                                                                file_path: "piano/kupdf.net_sheet-music-piano-score-nirvana-smells-like-teen-spirit1.pdf"}},
                                        aha: { take_on_me: {display_name: "Aha: Take on Me.pdf",
                                                            file_path: "piano/kupdf.net_take-on-me-sheet-music-a-hapdf.pdf"}},
                                        green_day: {wake_me_up_when_september_ends: {display_name: "Green Day: Wake Me Up When September Ends.pdf",
                                                                                    file_path: "piano/Wake-Me-Up-When-September-Ends-Sheet-Music-Green-Day-SheetMusic-Free.com_.pdf"}}}},
                book_collections:   {
                                    folder_name: "collections",
                                    button_name: "Book Collections",
                                    button_id: "bookCollectionsButton",
                                    div_id: "book-collection-div",
                                    pieces: {sum41: { chuck: {display_name: "Sum 41: Chuck.pdf",
                                                                file_path: "collections/scribd.vdownloaders.com_sum-41-chuck-authentic-transcriptions-with-notes-and-tablature.pdf"}},
                                            the_library_of_classical_guitar_favorites: {the_library_of_classical_guitar_favorites: {display_name: "The Library of Classical Guitar Favorites.pdf",
                                                                                                                                    file_path: "collections/The-library-of-classical-guitar-favorites-Amco-Publications-pdf.pdf"}}}},
                youtube_videos:     {
                                    button_name: "YouTube Videos",
                                    button_id: "youTubeVideosButton",
                                    div_id: "youtube-videos_div",
                                    pieces: {   bob_dylan: {mr_tamborine_man: {display_name: "Bob Dylan: Mr. Tamborine Man",
                                                                                file_path: "https://youtu.be/7SiaqzuiyGw?si=tcO_sWs3tzvtQiMc"}},
                                                joakim_ahlund: {jerk_it_out: {display_name: "Joakim Ahlund: Jerk It Out",
                                                                                file_path: "https://youtu.be/AVSPtkwMKW0?si=AHJ08SSCYczSaPHq"}},
                                                bryan_ferry: {love_is_a_drug: {display_name: "Bryan Ferry: Love Is a Drug",
                                                                                file_path: "https://youtu.be/O13vCJgeQRI?si=TDLkncx1G0IS_nr7"}},
                                                pete_townshend: {i_cant_explain: {display_name: "Pete Townshend: I Can't Explain",
                                                                                    file_path: "https://youtu.be/rDH99SVb1A4?si=qFjtNKgBARO5sbeL"}},
                                                billy_lunn: {oh_yeah: {display_name: "Billy Lunn: Oh Yeah",
                                                                        file_path: "https://youtu.be/qGA8JQe76-g?si=IYQzuB3p6ELS-HxC"}},
                                                william_butler: {ready_to_start: {display_name: "William Butler: Ready To Start",
                                                                                    file_path: "https://youtu.be/-OAqp-XPBcQ?si=iZ0oRh1Tw0QlFFmw"}},
                                                alex_chilton: {september_gurls: {display_name: "Alex Chilton: September Gurls",
                                                                                    file_path: "https://youtu.be/HgXoOVluN3w?si=GDx-tWTIc7KB4OhB"}},
                                                jack_white: {sixteen_saltines: {display_name: "Jack White: Sixteen Saltines",
                                                                                file_path: "https://youtu.be/y47mz9j3ICU?si=FcacjBBE63VQfED1"}},
                                                chrissie_hynde: {brass_in_pocket: {display_name: "Chrissie Hynde: Brass in Pocket",
                                                                                    file_path: "https://youtu.be/6FWXwXerzmA?si=U7xlRDwWVzRtWj7y"}},
                                                eddie_floyd: {knock_on_wood: {display_name: "Eddie Floyd: Knock on Wood",
                                                                                file_path: "https://youtu.be/UwGKRpDJnhI?si=oB1UzigqQvC6r4TO"}},
                                                elle_king: {exs_and_ohs: {display_name: "Elle King: Ex's and Oh's",
                                                                            file_path: "https://youtu.be/HQvLKhKB2zE?si=KLt610Sg6RJwUyPy"}},
                                                noel_gallagher: {morning_glory: {display_name: "Noel Gallagher: Morning Glory",
                                                                                file_path: "https://youtu.be/5l-6KrZhqDE?si=rWM5pdugTYGXSb6I"}},
                                                bryan_adams: {summer_of_69: {display_name: "Bryan Adams: Summer of 69",
                                                                            file_path: "https://youtu.be/jfeEtANu3wg?si=ZXB5wbFVHWFiDOhP"}},
                                                lou_reed: {sweet_jane: {display_name: "Lou Reed: Sweet Jane",
                                                                        file_path: "https://youtu.be/FJ1m81WpQho?si=HfWw72Ivq0nAeq0f"}},
                                                phil_medley: {twist_and_shout: {display_name: "Phil Medley: Twist and Shout",
                                                                                file_path: "https://youtu.be/xrdRji822uY?si=v42-gyFC0pmw5od3"}},
                                                david_bowie: {ziggy_stardust: {display_name: "David Bowie: Ziggy Stardust",
                                                                                file_path: "https://youtu.be/NtCBufEentk?si=m6DktmDrvFR6zyAK"}},
                                                richie_blackmore: {black_night: {display_name: "Richie Blackmore: Black Night",
                                                                                file_path: "https://youtu.be/ylh1ewEswh8?si=QKTfAIV6KymHztAL"}},
                                                alabama_shakes: {dont_wanna_fight: {display_name: "Alabama Shakes: Don't Wanna Fight",
                                                                                    file_path: "https://youtu.be/VMmnAj3EFRQ?si=H_UhYmhLr3GtL5j2"},
                                                                hold_on: {display_name: "Alabama Shakes: Hold on",
                                                                            file_path: "https://youtu.be/v42SHgo6UPg?si=JCfY0xLIHspaKEVB"}},
                                                the_cure: {friday_im_in_love: {display_name: "The Cure: Friday I'm In Love",
                                                                                file_path: "https://youtu.be/GMIPxtvGChw?si=z7INMxLalkulmmJj"}},
                                                coldplay: {in_my_place: {display_name: "Colplay: In My Place",
                                                                            file_path: "https://youtu.be/UJueBkrIGCk?si=1DsHK2h-mtL4LUlF"}},
                                                the_black_keys: {lonely_boy: {display_name: "the Black Keys: Lonely Boy",
                                                                                file_path: "https://youtu.be/WMExeOdLgJE?si=yM0E_JJtV09vC-ZI"}},
                                                amy_winehouse: {love_is_a_losing_game: {display_name: "Amy Winehouse: Love Is a Losing Game",
                                                                                        file_path: "https://youtu.be/ccDQfqV_gR4?si=BYF3kXDfgYWg8YFj"},
                                                                you_know_i_am_good: {display_name: "Amy Winehouse: You Know I Am Good",
                                                                                    file_path: "https://youtu.be/-wQVbUTNnVE?si=rSDg0uo0-qqhy0Ac"}},
                                                the_rolling_stones: {the_last_time: {display_name: "the Rolling Stones: the Last Time",
                                                                                        file_path: "https://youtu.be/gar5nMuf5GI?si=pGLco8XJGYUa4nmJ"}},
                                                acdc: {you_shook_me_all_night_long: {display_name: "ACDC: You Shook Me All Night Long",
                                                                                        file_path: "https://youtu.be/BZEKe1NS-Zw?si=8cDRXXmHxauRZeGK"}},
                                                james_brown: {cold_sweat: {display_name: "James Brown: Cold Sweat",
                                                                            file_path: "https://youtu.be/n4bLe04SYik?si=RwYJpxZ7SlcntW_P"}},
                                                the_beatles: {day_tripper: {display_name: "the Beatles: Day Tripper",
                                                                            file_path: "https://youtu.be/hV6PPlQMaIA?si=KBcFoPfg822jT8Mm"}},
                                                u2: {desire: {display_name: "U2: Desire",
                                                                file_path: "https://youtu.be/KbHFuJ679e0?si=P465iYN2U_2GUW2m"}},
                                                the_cult: {she_sells_sanctuary: {display_name: "the Cult: She Sells Sanctuary",
                                                                                file_path: "https://youtu.be/8z4kTTghLBo?si=qsc7vbkVUrZSRdsr"}},
                                                nirvana: {smells_like_teen_spirit: {display_name: "Nirvana: Smells Like Teen Spirit",
                                                                                    file_path: "https://youtu.be/CciumUS8_SQ?si=43NUennNc5hOTZBs"}},
                                                neil_young: {rockin_in_the_free_world: {display_name: "Neil Young: Rockin' in the Free World",
                                                                                        file_path: "https://youtu.be/OiPzvSw7Zrg?si=xhJVLSVRuKg0dVGp"}}
                                                }
                },
                whats_new:  {
                            button_name: "What's New",
                            button_id: "whatsNewButton",
                            div_id: "whats-new-div",
                            message:    {february_2024_3:   {message_header: "3 February 2024",
                                                                message_body: "Uploaded: \"Trinity guitar pop rock syllabus\"; \"Zombie\" by the Cranberries for piano; YouTube video links for the pop rock syllabus; And some beginner papers."},
                                        january_2024_27:    {message_header: "27 January 2024",
                                                                message_body: "Uploaded guitar chords sheets."},
                                        january_2024_22: {message_header: "22 January 2024",
                                                            message_body: "Uploaded Trinity guitar pieces and scales."}
                                        
                                        
                                        }
                            },
                updates:    {
                            button_name: "Updates",
                            button_id: "updatesButton",
                            div_id: "updates-div",
                            message:   {beta_2_7_1: { message_header: "Beta Version (2.7.1) 05/02/2024",
                                                        message_body: "Minor bug fixes with background color changes"},
                                        beta_2_7_0: { message_header: "Beta Version (2.7.0) 05/02/2024",
                                                        message_body: "Modified background color animations"},
                                        beta_2_6_0: { message_header: "Beta Version (2.6.0) 04/02/2024",
                                                        message_body: "Added a Shop button to the sidebar"},
                                        beta_2_5_0: { message_header: "Beta Version (2.5.0) 03/02/2024",
                                                        message_body: "Reduced the total amount of code needed for HTML by replacing it with JavaScript algorithms. Improved the general appearance of the div display order."},
                                        beta_2_4_0: { message_header: "Beta Version (2.4.0) 01/02/2024",
                                                        message_body: "Improved the code with better algorithms that reduces the amount of code in files, and help with the automation when uploading more files."},
                                        beta_2_3_0: { message_header: "Beta Version (2.3.0) 27/01/2024",
                                                        message_body: "Fixed the desktop web page display details. Added a new sidebar button for guitar chords."},
                                        beta_2_2_0: { message_header: "Beta Version (2.2.0) 25/01/2024",
                                                        message_body: "Changed the looks of the GUI with animation background and transparent menus."},
                                        beta_2_1_0: { message_header: "Beta Version (2.1.0) 24/01/2024",
                                                        message_body: "Created an entire GUI for mobile devices, and changed the general layout of the menus."},
                                        beta_2_0_1: { message_header: "Beta Version (2.0.1) 22/01/2024",
                                                        message_body: "Created a sidebar button for Trinity Guitar, and modified the spaces in each div tab."},
                                        beta_2_0_0: { message_header: "Beta Version (2.0.0) 14/01/2024",
                                                        message_body: "Created an entirely new interface for the user, and added a login page."}
                                        }
                            }       
}  

function create_div_menus(){
    const main_div = document.querySelector(".userpageDiv");
    for(const key in Files){
        const new_div = document.createElement('div');
        new_div.classList.add("menu-divs");
        new_div.id = Files[key].div_id;
        new_div.textContext = "";
        main_div.appendChild(new_div);
    }
    document.getElementById("whats-new-div").style.display = "block";
}

function sidePanelButton(button_id){
    change_random_background_colour();
    for (const key in Files){
        if (Files[key].button_id == button_id){
            document.getElementById(Files[key].button_id).style.color = "grey";
            document.getElementById(Files[key].button_id).style.fontWeight = "bold";
            document.getElementById(Files[key].div_id).style.display = "block";
        }
        else{
            if(key.toString() == "shop"){
                document.getElementById(Files[key].button_id).style.color = "chartreuse";
            }
            else{
                document.getElementById(Files[key].button_id).style.color = "white";
            }
            document.getElementById(Files[key].button_id).style.fontWeight = "normal";
            document.getElementById(Files[key].div_id).style.display = "none";
        }
    }
}

function files_length(target_object_directory){
    let total_files = 0;
    for(const key in target_object_directory){
        total_files += 1;
    }
    return total_files;
}

function is_youtube_div(key){
    if (key.toString() == "youtube_videos"){
        return "Watch Video";
    }
    else{
        return "Download";
    }
}

function div_pieces_setup(div_tab, key){
    let total_b = files_length(Files[key].pieces);
    let current_b = 0;
    for(const artist in Files[key].pieces){
        if(files_length(Files[key].pieces[artist]) < 1){
            continue;
        }
        else {
            total_b += files_length(Files[key].pieces[artist])-1;
            for(const b in Files[key].pieces[artist]){
                current_b += 1;
                if(current_b == 1){
                    const frag1 = document.createDocumentFragment();
                    const br = document.createElement('br');
                    frag1.appendChild(br);
                    div_tab.appendChild(frag1);
                }
                const new_a_1 = document.createElement('a');
                new_a_1.textContent = Files[key].pieces[artist][b].display_name;
                const frag1 = document.createDocumentFragment();
                const br1 = document.createElement('br');
                frag1.appendChild(br1);
                const new_a_2 = document.createElement('a');
                new_a_2.textContent = is_youtube_div(key);
                new_a_2.href = Files[key].pieces[artist][b].file_path;
                new_a_2.download = Files[key].pieces[artist][b].display_name;
                const frag2 = document.createDocumentFragment();
                const br2 = document.createElement('br');
                frag2.appendChild(br2);
                
                div_tab.appendChild(new_a_1);
                div_tab.appendChild(frag1);
                div_tab.appendChild(new_a_2);
                div_tab.appendChild(frag2);

                if(current_b < total_b){
                    const new_hr = document.createElement('hr');
                    new_hr.style.color = "white";
                    div_tab.appendChild(new_hr);
                }
            }
        }
    }
}

function div_shop_setup(div_tab, key){
    let total_b = files_length(Files[key].message);
    let current_b = 0;
    for(const update in Files[key].message){
        current_b += 1;
        if(current_b == 1){
            const br = document.createElement('br');
            const frag = document.createDocumentFragment();
            frag.appendChild(br);
            div_tab.appendChild(frag);
        }
        const img = document.createElement('img');
        img.src = Files[key].message[update].image_directory;
        const br0 = document.createElement('br');
        const frag0 = document.createDocumentFragment();
        frag0.appendChild(br0);
        const a = document.createElement('a');
        a.style.color = "chartreuse";
        a.textContent = Files[key].message[update].message_header;
        const br1 = document.createElement('br');
        const frag1 = document.createDocumentFragment();
        frag1.appendChild(br1);
        const a1 = document.createElement('a');
        a1.textContent = Files[key].message[update].message_body;

        div_tab.appendChild(img);
        div_tab.appendChild(frag0);
        div_tab.appendChild(a);
        div_tab.appendChild(frag1);
        div_tab.appendChild(a1);

        if(current_b < total_b){
            const new_hr = document.createElement('hr');
            new_hr.style.color = "white";
            div_tab.appendChild(new_hr);
        }
    }
}

function div_updates_setup(div_tab, key){
    let total_b = files_length(Files[key].message);
    let current_b = 0;
    for(const update in Files[key].message){
        current_b += 1;
        if(current_b == 1){
            const br = document.createElement('br');
            const frag = document.createDocumentFragment();
            frag.appendChild(br);
            div_tab.appendChild(frag);
        }
        const a = document.createElement('a');
        a.style.color = "chartreuse";
        a.textContent = Files[key].message[update].message_header;
        const br1 = document.createElement('br');
        const frag1 = document.createDocumentFragment();
        frag1.appendChild(br1);
        const a1 = document.createElement('a');
        a1.textContent = Files[key].message[update].message_body;

        div_tab.appendChild(a);
        div_tab.appendChild(frag1);
        div_tab.appendChild(a1);

        if(current_b < total_b){
            const new_hr = document.createElement('hr');
            new_hr.style.color = "white";
            div_tab.appendChild(new_hr);
        }
    }
}

function populate_div_tabs(){
    const dictionary_length = files_length(Files);
    let file_number = 0;
    for(const key in Files){
        file_number += 1;
        const div_tab = document.getElementById(Files[key].div_id);
        const new_h1 = document.createElement('h1');
        new_h1.textContent = Files[key].button_name;
        div_tab.appendChild(new_h1);
        
        if(key.toString() == "shop"){
            div_shop_setup(div_tab, key);
        }
        // if it is pieces menu
        else if(file_number <= dictionary_length -2){
            if(files_length(Files[key].pieces) < 1){
                continue;
            }
            //if artists in folder is less than 2
            else if(files_length(Files[key].pieces) < 2){
                div_pieces_setup(div_tab, key);
            }
            //if artists in folder is more than 2
            else if(files_length(Files[key].pieces) > 1){
                div_pieces_setup(div_tab, key);
            }
        }
        //// If it is not pieces div menus
        else{
            div_updates_setup(div_tab, key);
        }
    }
}

function sidebar_setup(){
    for (const key in Files){
        const sidebar = document.querySelector('.sidebar');
        const newAnchor = document.createElement('a');
        newAnchor.id = Files[key].button_id;
        newAnchor.textContent = Files[key].button_name;
        newAnchor.onclick = () => sidePanelButton(Files[key].button_id)
        const fragment = document.createDocumentFragment();
        const fragment2 = document.createDocumentFragment();
        const br = document.createElement('br');
        const br2 = document.createElement('br');
        fragment.appendChild(br);
        fragment2.appendChild(br2);
        sidebar.appendChild(newAnchor);
        sidebar.appendChild(fragment);
        sidebar.appendChild(fragment2);
        if(key.toString() == "shop"){
            newAnchor.style.color = "chartreuse";
        }
    }
}

change_random_background_colour();
create_div_menus();
populate_div_tabs();
sidebar_setup();
