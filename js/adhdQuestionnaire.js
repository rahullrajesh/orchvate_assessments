function setAutismQuestionnaire() {
    loadQuestionnaire(["I have trouble wrapping up the final details of a project, once the challenging parts have been done.",
        "I have difficulty getting things in order when you have to do a task that requires organization.",
        "I have problems remembering appointments or obligations.",
        "When I have a task that requires a lot of thought, I avoid or delay getting started.",
        "I fidget or squirm with my hands or feet when I have to sit down for a long time.",
        "I feel overly active and compelled to do things, like I’m being driven by a motor.",
        "I make careless mistakes when I have to work on a boring or difficult project.",
        "I have difficulty keeping my attention when I’m doing boring or repetitive work.",
        "I have difficulty concentrating on what people say to me, even when they are speaking to me directly.",
        "I misplace or have difficulty finding things at home or at work.",
        "I’m distracted by activity or noise around me.",
        "I leave my seat in meetings or other situations where I’m expected to remain seated.",
        "I feel restless or fidgety.",
        "I have difficulty unwinding and relaxing when I have time to myself.",
        "I find myself talking too much when I’m in social situations.",
        "When I’m in a conversation, I find myself finishing sentences of people I’m  talking to, before they can finish them themselves.",
        "I have difficulty waiting for my turn in situations when turn taking is required.",
        "I interrupt others when they are busy."
    ]);
}

function loadQuestionnaire(questionsArray) {
    var questionnaireHtml = '';

    for (var index = 0; index < questionsArray.length; index++) {
        var question = questionsArray[index];
        questionnaireHtml += getADHDQuestionnaireTableRow(index, question);
    }
    $('div.questions').find('tbody').html(questionnaireHtml);
}

function getADHDQuestionnaireTableRow(index, question) {
    var count = index + 1;
    return '<tr id="trQuestion_' + count + '" > <td> ' + count + '. &emsp; </td> <td> ' + question + '&emsp; </td> <td style="padding-top: 10px;"> <form> <select id="questions_' + count + '" name="questions_' + count + '"> <option value="N">Never</option> <option value="R">Rarely</option> <option value="S">Sometimes</option> <option value="O">Often</option> <option value="VO">Very Often</option> </select> </form> </td> </tr>';
}

function calculateADHDScore() {
    var totalPoints = 0;
    totalPoints = calculatePartAAdhd() + calculatePartBAdhd();
    $('[id^=questions_]').attr("disabled", true);
	$('#assessScore').css( "display", "none" );
	$('#reAssessScore').css( "display", "inline" );
	$('#scoringMethodology').css( "display", "block" );
	$('#thankYouDiv').css( "display", "inline" );
	$('#score').val(totalPoints);
}

function calculatePartAAdhd(){
    var partAPoints = 0;
    var sOrOorVO = [1,2,3];
    for (var index = 0; index < 6; index++) {
        var questionId = "#questions_" + (index + 1);
        if (sOrOorVO.includes(index + 1) && ($(questionId).val() === 'S' || $(questionId).val() === 'O' || $(questionId).val() === 'VO')) {
            partAPoints++;
        } else if ($(questionId).val() === 'O' || $(questionId).val() === 'VO') {
            partAPoints++;
        }
    } 
    return partAPoints;
}

function calculatePartBAdhd(){
    var partBPoints = 0;
    var sOrOorVO = [9,12,16,18];
    var oOrVO = [7,8,10,11,12, 13,14,15,17];
    for (var index = 6; index < 18; index++) {
        var questionId = "#questions_" + (index + 1);
        if (sOrOorVO.includes(index + 1) && ($(questionId).val() === 'S' || $(questionId).val() === 'O' || $(questionId).val() === 'VO')) {
            partBPoints++;
        } else if (oOrVO.includes(index + 1) && ($(questionId).val() === 'O' || $(questionId).val() === 'VO')) {
            partBPoints++; 
        }
    }
    return partBPoints;
}

function reEvaluateADHDScore(){
	for (var index = 0; index < 50; index++) {
        var questionId = "#questions_" + (index + 1);
        $(questionId).val("N");
        $(questionId).attr("disabled", false);
    }
	$('#assessScore').css( "display", "inline" );
	$('#reAssessScore').css( "display", "none" );
	$('#scoringMethodology').css( "display", "none" );
	$('#thankYouDiv').css( "display", "none" );
}