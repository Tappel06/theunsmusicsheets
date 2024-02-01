var menuButtonActivated = false;
var LI = false;

const UN = ["698b821c4bba9df9e6dac89b46d8d12d55aa8698617085ebb6ad7aa4e86c4ba2", //Admin
            "c1144dfca7ce1f5d8311ba7566a3cbcc7f553025a03e5df6a61b0f17d49451bd", //Dan
            "20221aef7b8199c90d84bfda6cabdcf13298824757d54615c275f8951d2692f5" //Shrav
            ];

const UP = ["ab572f60a5aa6309b459cc54296e5eddc7d4023636de4d8dd9e73fd613ca4c2c", //Admin
            "7683a5e6ab51379c9486793bd7c0e0dcf503f24903474802523c49b8ac6afe52", //Dan
            "5974261690314f0b556b68638dfd287c7eabade638055e52b720925e71d1a257" //Shrav
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

async function loginSubmitButton(){
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const isUserValid = await userExists(username, password);

    if(isUserValid == true){
        LI = true
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

const Files = { guitar: {
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
                                pieces: {trinity: { scales_gr_1_to_5: {display_name: "Trinity: Scales Grade 1-5.pdf",
                                                                        file_path: "Trinity Guitar/Trinity scales grd 1-5.pdf"},
                                                    grade_1_2020:   {display_name: "Trinity: Grade 1 - 2020.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 1 - 2020.pdf"},
                                                    grade_2_2020:   {display_name: "Trinity: Grade 2 - 2020.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 2 - 2020.pdf"},
                                                    grade_3_2020:   {display_name: "Trinity: Grade 3 - 2020.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 3 - 2020.pdf"},
                                                    grade_4_2010:   {display_name: "Trinity: Grade 4 - 2010.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 4 - 2010.pdf"},
                                                    grade_5_2010:   {display_name: "Trinity: Grade 5 - 2010.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 5 - 2010.pdf"},
                                                    grade_6_2010:   {display_name: "Trinity: Grade 6 - 2010.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 6 - 2010.pdf"},
                                                    grade_7_2010:   {display_name: "Trinity: Grade 7 - 2010.pdf",
                                                                        file_path: "Trinity Guitar/Trinity grade 7 - 2010.pdf"},}}},
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
                                pieces: {nirvana: { smells_like_teen_spirit: {display_name: "Nirvana: Smells Like Teen Spirit.pdf",
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
                                                                                                                                    file_path: "collections/The-library-of-classical-guitar-favorites-Amco-Publications-pdf.pdf"}},
                                            the_ultimate_pop_rock_fake_book: {the_ultimate_pop_rock_fake_book: {display_name: "The Ultimate Pop Rock Fake Book.pdf",
                                                                                                                file_path: "collections/The-Ultimate-Pop-Rock-Fake-Book.pdf"}}}},
                whats_new:  {
                            button_name: "What's New",
                            button_id: "whatsNewButton",
                            div_id: "whats-new-div",
                            message:    {  january_2024_22: {message_header: "22 January 2024",
                                                                message_body: "Uploaded Trinity guitar pieces and scales."
                                                            },
                                        january_2024_27:    {message_header: "27 January 2024",
                                                                message_body: "Uploaded guitar chords sheets."
                                                            }
                                        }
                            },
                updates:    {
                            button_name: "Updates",
                            button_id: "updatesButton",
                            div_id: "updates-div",
                            message:   {beta_2_0_0: { message_header: "Beta Version (2.0.0) 14/01/2024",
                                                        message_body: "Created an entirely new interface for the user, and added a login page."
                                                    },
                                        beta_2_0_1: { message_header: "Beta Version (2.0.1) 22/01/2024",
                                                        message_body: "Created a sidebar button for Trinity Guitar, and modified the spaces in each div tab."
                                                    },
                                        beta_2_1_0: { message_header: "Beta Version (2.1.0) 24/01/2024",
                                                        message_body: "Created an entire GUI for mobile devices, and changed the general layout of the menus."
                                                    },
                                        beta_2_2_0: { message_header: "Beta Version (2.2.0) 25/01/2024",
                                                        message_body: "Changed the looks of the GUI with animation background and transparent menus."
                                                    },
                                        beta_2_3_0: { message_header: "Beta Version (2.3.0) 27/01/2024",
                                                        message_body: "Fixed the desktop web page display details. Added a new sidebar button for guitar chords."
                                                    },
                                        beta_2_4_0: { message_header: "Beta Version (2.4.0) 01/02/2024",
                                                        message_body: "Improved the code with better algorithms that reduces the amount of code in files, and help with the automation when uploading more files."
                                                    }
                                        }
                            }       
}  

function sidePanelButton(button_id){
    for (const key in Files){
        if (Files[key].button_id == button_id){
            document.getElementById(Files[key].button_id).style.color = "grey";
            document.getElementById(Files[key].button_id).style.fontWeight = "bold";
            document.getElementById(Files[key].div_id).style.display = "block"
        }
        else{
            document.getElementById(Files[key].button_id).style.color = "white";
            document.getElementById(Files[key].button_id).style.fontWeight = "normal";
            document.getElementById(Files[key].div_id).style.display = "none"
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

function populate_div_tabs(){
    const dictionary_length = files_length(Files);
    let file_number = 0;
    for(const key in Files){
        file_number += 1;
        const div_tab = document.querySelector("." + Files[key].div_id);
        const new_h1 = document.createElement('h1');
        new_h1.textContent = Files[key].button_name;
        div_tab.appendChild(new_h1);
        
        // if it is pieces menu
        if(file_number <= dictionary_length -2){
            if(files_length(Files[key].pieces) < 1){
                continue;
            }
            //if artists in folder is less than 2
            else if(files_length(Files[key].pieces) < 2){
                for (const artist in Files[key].pieces){
                    if(files_length(Files[key].pieces[artist]) < 1){
                        continue;
                    }
                    //if total pieces is for artist is less than two
                    else if(files_length(Files[key].pieces[artist]) < 2){
                        const total_b = files_length(Files[key].pieces[artist]);
                        let current_b = 0
                        for(const b in Files[key].pieces[artist]){
                            current_b += 1;
                            
                            if(current_b == 1){
                                const frag1 = document.createDocumentFragment();
                                const br = document.createElement('br');
                                frag1.appendChild(br);
                                div_tab.appendChild(frag1);
                            }
                            const new_anchor_1 = document.createElement('a');
                            new_anchor_1.textContent = Files[key].pieces[artist][b].display_name;
                            const frag1 = document.createDocumentFragment();
                            const br1 = document.createElement('br');
                            frag1.appendChild(br1);
                            const new_a_2 = document.createElement('a');
                            new_a_2.textContent = "Download";
                            new_a_2.href = Files[key].pieces[artist][b].file_path;
                            new_a_2.download = Files[key].pieces[artist][b].display_name;

                            div_tab.appendChild(new_anchor_1);
                            div_tab.appendChild(frag1);
                            div_tab.appendChild(new_a_2);
                        }
                    }
                    //if total pieces for artist is more than one
                    else{
                        const total_b = files_length(Files[key].pieces[artist]);
                        let current_b = 0
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
                            new_a_2.textContent = "Download";
                            new_a_2.href = Files[key].pieces[artist][b].file_path;
                            new_a_2.download = Files[key].pieces[artist][b].display_name;
                            const frag2 = document.createDocumentFragment();
                            const br2 = document.createElement('br');
                            frag2.appendChild(br2);
                            
                            div_tab.appendChild(new_a_1);
                            div_tab.appendChild(frag1);
                            div_tab.appendChild(new_a_2);
                            div_tab.appendChild(frag2);

                            if(current_b != total_b){
                                const new_hr = document.createElement('hr');
                                new_hr.style.color = "white";
                                div_tab.appendChild(new_hr);
                            }
                        }   
                    }
                }
            }
            //if artists in folder is more than 2
            else if(files_length(Files[key].pieces) > 1){
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
                            new_a_2.textContent = "Download";
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
        }
        //// If it is not pieces div menus
        else{
            let total_b = files_length(Files[key].message);
            let current_b = 0;
            for(const update in Files[key].message){
                current_b += 1
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
    }
}

populate_div_tabs();
sidebar_setup();
