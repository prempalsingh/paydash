'use strict';

module.exports = {
    $meta: 'Hindi translation file',
    profile: {
        firstname: 'मूल नाम',
        lastname: 'उपनाम',
        profile: 'प्रोफ़ाइल',
        account: 'अकाउंट',
        work_email: 'औपचारिक e-mail',
        mobile: 'मोबाइल नंबर',
        personal_email: 'निजी e-mail',
        lang : 'भाषा',
        settings: 'सेट्टिंग्स',
        logout: 'लौग आउट',
        profile_settings: 'आपकी प्रोफ़ाइल सेट्टिंग्स',
        email_settings: 'E-Mail सेट्टिंग्स',
        primary_email_msg: 'आपके अकाउंट से संबंधित संदेशों और इंटरनेट-संबंधित प्रक्रियाओं के लिए आपके मुख्य e-mail ID का उपयोग किया जाएगा.',
        save: 'अद्यतन (update)',
        your_primary_email: 'आपका मुख्य e-mail ID',
        change_pass: 'पासवर्ड बदलें',
        old_pass: 'पुराना पासवर्ड ',
        new_pass: 'नया पासवर्ड ',
        pass_confirm:'नये पासवर्ड को सत्यापित करें',
        forgot_pass: 'मैं अपना पासवर्ड भूल गयी/गया'
    },
    navigation: {
        overview: {
            $filter: 'role',
            district: 'ज़िला प्रदर्शन',
            block: 'प्रखंड/जनपद प्रदर्शन',
            $default: 'अवलोकन प्रदर्शन'
        },
        discrete: {
            $filter: 'role',
            district: 'प्रखंड/जनपद प्रदर्शन',
            block: 'पंचायत प्रदर्शन',
            $default: 'अलहदा प्रदर्शन'
        },
        current: 'वर्तमान मस्टर्स',
        delayed: 'विलंबित मस्टर्स'
    },
    notifications : {
        read : 'पठित संदेश',
        unread : 'अपठित संदेश',
        message: {
            1: {
                $filter: 'role',
                block: [' प्रखंड/जनपद में ',' तारीख को ',' MGNREGA भुगतान हुए |'],
                district: [' ज़िला में ',' तारीख को ',' MGNREGA भुगतान हुए |']
            },
            2: {
                main: ['औसतन, मस्टर रोल बंद होने से बैंक की कारवाई के समापन के बीच ',' दिन लगे, जो की सरकार द्वारा नियमित 15-दिन की सीमा ',' है |'],
                comparison: ['से ज़्यादा','के बराबर','से कम']
            }
        }
    },
    browser_msg: 'आपका browser इस वेबसाइट के लिए अनुकूल नहीं है. PayDash चलाने के लिए Chrome, Firefox या Internet Explorer 9 या ऊंचे संस्करण का उपयोग करें.',
    messages: {
        loading: 'डाटा लोड हो रहा है...',
        not_found: 'पृष्ठ नहीं मिला। Paydash टीम से संपर्क करें.'
    },
    time_selector :{
        '1': 'सारी उपलब्ध तिथियाँ',
        '2': 'पिछले 60 दिन',
        '3': 'पिछले 30 दिन'
    },
    payment_steps: {
        '1': 'मस्टर रोल बंद से डाटा एंट्री का समय',
        '2': 'डाटा एंट्री से वेज लिस्ट बनाने का समय',
        '3': 'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
        '4': 'वेज लिस्ट भेजने से FTO बनाने का समय',
        '5': 'FTO बनाने से पहले हस्ताक्षर का समय',
        '6': 'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
        '7': 'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय'
    },
    payment_steps_labels: [
        'मस्टर रोल बंद से डाटा एंट्री का समय',
        'डाटा एंट्री से वेज लिस्ट बनाने का समय',
        'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
        'वेज लिस्ट भेजने से FTO बनाने का समय',
        'FTO बनाने से पहले हस्ताक्षर का समय',
        'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
        'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय'
    ],
    compare_chart_labels:{
        'state': 'राज्य औसत',
        'district': 'ज़िला औसत',
        'block': 'प्रखंड/जनपद औसत'
    },
    y_axis_labels: 'प्रक्रिया पूरी करने में लगे दिन',
    total_trans :"तिथि : कुल भुगतानों की संख्या-",
    performance: {
        overview: {
            chart_a: {
                title: {
                    $filter: 'role',
                    district: 'आपके ज़िले का प्रदर्शन',
                    block: 'आपके प्रखंड/जनपद का प्रदर्शन',
                    $default: 'अवलोकन प्रदर्शन'
                },
                description: {
                    $filter: 'role',
                    district: 'आपके ज़िले में मज़दूरी भुगतान के हर एक पड़ाव पर लगे औसत दिन',
                    block: 'आपके प्रखंड/जनपद में मज़दूरी भुगतान के हर एक पड़ाव पर लगे औसत दिन',
                    $default: 'आपके क्षेत्रों में मज़दूरी भुगतान के हर एक पड़ाव पर लगे औसत दिन'
                }
            },
            chart_b: {
                title: {
                    $filter: 'role',
                    district: 'आपके प्रदर्शन की तुलना',
                    block: 'आपके प्रदर्शन की तुलना',
                    $default: 'आपके प्रदर्शन की तुलना'
                },
                description: {
                    $filter: 'role',
                    district: 'अपने ज़िले के औसत प्रदर्शन की तुलना राज्य के औसत प्रदर्शन से करें',
                    block: 'अपने प्रखंड/जनपद के औसत प्रदर्शन की तुलना ज़िले और राज्य के औसत प्रदर्शन से करें ',
                    $default: 'अपने प्रखंड/जनपद के औसत प्रदर्शन की तुलना अन्य क्षेत्रों के औसत प्रदर्शन से करें'
                }
            },
            tooltip: 'यह ग्राफ़ MGNREGA मज़दूरी भुगतान में लगा औसत समय दिखाता है| वर्णित तिथियों पर हुए भुगतान में लगे समय को 7 पड़ावों में बाटा गया है| इसलिए, केवल पूरे हुए भुगतान का डाटा दिखाया जा रहा है|',
        },
        discrete:{
            sub_heading: {
                '1' : {
                    $filter: 'role',
                    block: 'आपके जनपद/प्रखंड की पंचायत',
                    district: 'आपके ज़िले में प्रखंड/पंचायत'
                },
                '2' : 'का प्रदर्शन'
            },
            subtitle: {
                $filter: 'role',
                block: 'आपकी पंचायतों में मज़दूरी भुगतान की प्रक्रिया के हर एक पड़ाव में लगा औसत समय',
                district: 'आपके प्रखंडों/पंचायतों में मज़दूरी भुगतान की प्रक्रिया के हर एक पड़ाव में लगा औसत समय',
                $default :'अपने क्षेत्रों में मज़दूरी भुगतान की प्रक्रिया के हर एक पड़ाव में लगा औसत समय'
            },
            tooltip: 'यह ग्राफ़ MGNREGA मज़दूरी भुगतान में लगा औसत समय दिखाता है| वर्णित तिथियों पर हुए भुगतान में लगे समय को 7 पड़ावों में बाटा गया है| इसलिए, केवल पूरे हुए भुगतान का डाटा दिखाया जा रहा है|',
            ta_message: 'आपके प्रखंड/जनपद में कुछ TAs/SEs/JEs और उनकी पंचायतों के नाम MGNREGA वेबसाइट पर अपडेट नहीं किए गये हैं| इस के परिणाम स्वरूप, हम आपको आपके प्रखंड/जनपद के सभी TAs/SEs/JEs  के प्रदर्शन की जानकारी नहीं दे सकते| यह जानकारी पाने के लिए कृपया nrega.nic.in पर सभी TAs/SEs/JEs  और उनकी पंचायतों के नाम भरें|',
            grs_message: 'आपके प्रखंड/जनपद में कुछ GRSs और उनकी पंचायतों के नाम MGNREGA वेबसाइट पर अपडेट नहीं किए गये हैं| इस के परिणाम स्वरूप, हम आपको आपके प्रखंड/जनपद के सभी GRSs के प्रदर्शन की जानकारी नहीं दे सकते| यह जानकारी पाने के लिए कृपया nrega.nic.in पर सभी GRSs और उनकी पंचायतों के नाम भरें|',
            panchayat_chart_placeholder: 'भुगतान के प्रदर्शन को देखने के लिए एक पंचायत या प्रखंड/जनपद का चयन करें ',
            grouping_selectors: {
                no: 'बिना कोई वर्गीकरण',
                ta:'वर्ग: उप यंत्री',
                grs: 'वर्ग: GRS'
            },
            sidebar : {
                total_trans: 'कुल भुगतान ',
                avg_days: 'पंचायतों में मस्टर रोल बंद से डाटा एंट्री में लगा समय (औसत)'
            }
        }
    },
    musters: {
        current: {
            title: 'आज बंद हो रहे मस्टर्स'
        },
        delayed:{
            title: 'विलंबित मस्टर्स',
            t_2: 'अटेंडेन्स नहीं भरी गयी (T+2)',
            t_5: 'MB नहीं भरी गयी (T+5)',
            t_6: 'वेज लिस्ट नहीं भेजी गयी (T+6)',
            t_7: 'FTO पर पहला हस्ताक्षर नहीं हुआ (T+7)',
            t_8: 'FTO पर दूसरा हस्ताक्षर नहीं हुआ (T+8)'
        }
    },
    app: {
        overview: {
            musters_closing_today: 'आज बंद हो रहे मस्टर्स',
            delayed_musters: 'विलंबित मस्टर्स',
            total_transactions: 'पिछले 3 महीनों में कुल कितने भुगतान हुए',
            days_to_payment: 'पिछले 3 महीनों में भुगतान के लिए दिन',
            cards_need_attention: 'कार्ड्स को आपके ध्यान की ज़रूरत है',
            view_cards: 'कार्ड्स देखें'
        },
        cards: {
            musters_closing_today: 'आज बंद हो रहे मस्टर्स',
            delayed_musters_1: 'विलंबित मस्टर्स',
            muster_details: 'मस्टर्स की विस्तार से जानकारी',
            current_musters: 'वर्तमान मस्टर्स',
            delayed_musters_2: 'विलंबित मस्टर्स',
            work_code: 'कार्य कोड',
            work_name: 'कार्य नाम',
            closure_date: 'मस्टर रोल बंद होने की तिथि',
            days_delayed: 'विलंब(दिन)'
        },
        chart: {
            days_to_complete_process: 'प्रक्रिया पूरी करने में लगे दिन',
            steps: {
                1:'मस्टर रोल बंद से डाटा एंट्री का समय',
                2:'डाटा एंट्री से वेज लिस्ट बनाने का समय',
                3:'वेज लिस्ट बनाने से वेज लिस्ट भेजने का समय',
                4:'वेज लिस्ट भेजने से FTO बनाने का समय',
                5:'FTO बनाने से पहले हस्ताक्षर का समय',
                6:'पहले हस्ताक्षर से दूसरे हस्ताक्षर का समय',
                7:'दूसरे हस्ताक्षर से बैंक की कारवाई के समापन का समय',
                total:'Total Length of Process',
                all:'पूरी प्रक्रिया के सारे पड़ाव',
            },
            dates: {
                all_dates: 'सभी तारीखें',
                past_3_months: 'पिछले 3 महीने'
            },
            regions: {
                panchayat: 'पंचायत',
                block: 'प्रखंड/जनपद',
                district: 'ज़िला'
            },
            tooltip: {
                date: 'तारीख',
                days: 'औसत दिन',
                transactions: 'भुगतान',
                step: 'कदम'
            }
        },
        profile: {
            firstname: 'मूल नाम',
            lastname: 'उपनाम',
            profile: 'प्रोफ़ाइल',
            account: 'अकाउंट',
            work_email: 'औपचारिक e-mail',
            mobile: 'मोबाइल नंबर',
            personal_email: 'निजी e-mail',
            lang : 'भाषा',
            settings: 'सेट्टिंग्स',
            logout: 'लौग आउट',
            profile_settings: 'आपकी प्रोफ़ाइल सेट्टिंग्स',
            email_settings: 'E-Mail सेट्टिंग्स',
            primary_email_msg: 'आपके अकाउंट से संबंधित संदेशों और इंटरनेट-संबंधित प्रक्रियाओं के लिए आपके मुख्य e-mail ID का उपयोग किया जाएगा.',
            save: 'अद्यतन (update)',
            your_primary_email: 'आपका मुख्य e-mail ID',
            change_pass: 'पासवर्ड बदलें',
            old_pass: 'पुराना पासवर्ड ',
            new_pass: 'नया पासवर्ड ',
            pass_confirm:'नये पासवर्ड को सत्यापित करें',
            forgot_pass: 'मैं अपना पासवर्ड भूल गयी/गया'
        },
        messages: {
            login: {
                connectivity: 'हमे खेद है कि आप log in करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें |',
                credentials: 'ऐसा व्यतीत होता है कि आपने ग़लत username या password भरा है | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें |',
                general: 'हमे खेद है कि आप log in करने में विफल रहे | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें |'
            },
            logout: {
                connectivity: 'हमे खेद है कि आप log out करने में विफल रहे| कृपया अपने फ़ोन/कंप्यूटर की internet connectivity को जाँच लें |',
                warning: {
                    'message':'क्या आप सचमुच Log Out करना चाहते हैं? PayDash का offline mode तभी तक उपलब्ध रहेगा जब तक आप logged in हैं |',
                    'logout': 'Log out',
                    'cancel': 'Cancel'
                },
                general: 'हमे खेद है कि आप log out करने में विफल रहे | यदि यह समस्या कायम रहती है तो PayDash दल से संपर्क करें |'
            },
            password_success: 'Password changed successfully. Please login with new password.',
            password_wrong_old: 'Old password is incorrect. Please contact the PayDash team if you require assistance.',
            password_new_nomatch: 'New password does not match.',
            password_tooshort: 'Your new password must be at least 6 characters long.'
        },
        whatsapp: {
            block: 'Muster Roll Details for {name}\n\n{current_total} musters closing today\n{delayed_total} delayed musters\n\nMUSTERS CLOSING TODAY\n\n_Msr_\n{msr_no}\n_Panchayat_\n{panchayat_name}\n_Work code_\n{work_code}\n_Work name_\n{work_name}\n_Closure date_\n{closure_date}\n\nDELAYED MUSTERS\n\n_Msr_\n{msr_no}\n_Panchayat_\n{panchayat_name}\n_Work code_\n{work_code}\n_Work name_\n{work_name}\n_Closure date_\n{closure_date}\n_Days delayed_\n{days_pending}\n\n',
            district: 'MGNREGA Payment Delay Performance for {name}\n\n_Block_\n{block_name}\n\n{days_to_payment} days to complete payment\n{current_total} musters closing today\n{delayed_total} delayed musters\n\nMUSTERS DELAYED AT DIFFERENT STEPS\n\n*Attendance not filled (T+2)*\n_Total_\n{t2_total}\n_Avg. days pending_\n{t2_avg}\n\n*Measurement book not filled (T+5)*\n_Total_\n{t5_total}\n_Avg. days pending_\n{t5_avg}\n\n*Wagelist not sent (T+6)*\n_Total_\n{t6_total}\n_Avg. days pending_\n{t6_avg}\n\n*Pending for FTO first signature (T+7)*\n_Total_\n{t7_total}\n_Avg. days pending_\n{t7_avg}\n\n*Pending for FTO second signature (T+8)*\n_Total_\n{t8_total}\n_Avg. days pending_\n{t8_avg}\n'    
        }
    }
};
