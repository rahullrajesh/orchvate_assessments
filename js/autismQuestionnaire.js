function setAutismQuestionnaire() {
    loadQuestionnaire(["I prefer to do things with others rather than on my own.",
        "I prefer to do things the same way over and over again.",
        "If I try to imagine something, I find it very easy to create a picture in my mind.",
        "I frequently get so strongly absorbed in one thing that I lose sight of other things.",
        "I often notice small sounds when others do not.",
        "I usually notice car number plates or similar strings of information.",
        "Others frequently tell me that what I’ve said is impolite, even though I think it’s polite.",
        "When I’m reading a story, I can easily imagine what the characters might look like.",
        "I am fascinated by dates.",
        "In a social group, I can easily keep track of several different people’s conversations.",
        "I find social situations easy.",
        "I tend to notice details that others do not.",
        "I would rather go to a library than to a party.",
        "I find making up stories easy.",
        "I find myself drawn more strongly to people than to things.",
        "I tend to have very strong interests, which I get upset about if I can’t pursue.",
        "I enjoy social chitchat.",
        "When I talk, it isn’t always easy for others to get a word in edgewise.",
        "I am fascinated by numbers.",
        "When I’m reading a story, I find it difficult to work out the characters’ intentions.",
        "I don’t particularly enjoy reading fiction.",
        "I find it hard to make new friends.",
        "I notice patterns in things all the time.",
        "I would rather go to the theatre than to a museum.",
        "It does not upset me if my daily routine is disturbed.",
        "I frequently find that I don’t know how to keep a conversation going.",
        "I find it easy to “read between the lines” when someone is talking to me.",
        "I usually concentrate more on the whole picture, rather than on the small details.",
        "I am not very good at remembering phone numbers.",
        "I don’t usually notice small changes in a situation or a person’s appearance.",
        "I know how to tell if someone listening to me is getting bored.",
        "I find it easy to do more than one thing at once.",
        "When I talk on the phone, I’m not sure when it’s my turn to speak.",
        "I enjoy doing things spontaneously.",
        "I am often the last to understand the point of a joke.",
        "I find it easy to work out what someone’s thinking/feeling just by looking at their face.",
        "If there is an interruption, I can switch back to what I was doing very quickly.",
        "I am good at social chitchat.",
        "People often tell me that I keep going on and on about the same thing.",
        "When I was young, I used to enjoy playing games involving pretending with other children.",
        "I like to collect information about categories of things (e.g., cars, birds, trains, plants).",
        "I find it difficult to imagine what it would be like to be someone else.",
        "I like to carefully plan any activities I participate in.",
        "I enjoy social occasions.",
        "I find it difficult to work out people’s intentions.",
        "New situations make me anxious.",
        "I enjoy meeting new people.",
        "I am a good diplomat.",
        "I am not very good at remembering people’s date of birth.",
        "I find it very easy to play games with children that involve pretending."
    ]);
}

function loadQuestionnaire(questionsArray) {
    var questionnaireHtml = '';

    for (var index = 0; index < questionsArray.length; index++) {
        var question = questionsArray[index];
        questionnaireHtml += getAutismQuestionnaireTableRow(index, question);
    }
    $('div.questions').find('tbody').html(questionnaireHtml);
}

function getAutismQuestionnaireTableRow(index, question) {
    var count = index + 1;
    return '<tr id="trQuestion_' + count + '" > <td> ' + count + '. &emsp; </td> <td> ' + question + '&emsp; </td> <td style="padding-top: 10px;"> <form> <select id="questions_' + count + '" name="questions_' + count + '"> <option value="DA">Definitely Agree</option> <option value="SA">Slightly Agree</option> <option value="SD">Slightly Disagree</option> <option value="DD">Definitely Disagree</option> </select> </form> </td> </tr>';
}

function calculateAutismScore() {
    var totalPoints = 0;
    var scoreDaOrSa = [2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46];
    var scoreDdOrSd = [1, 3, 8, 10, 11, 14, 15, 17, 24, 25, 27, 28, 29, 30, 31, 32, 34, 36, 37, 38, 44, 47, 48, 49, 50];
    for (var index = 0; index < 50; index++) {
        var questionId = "#questions_" + (index + 1);
        if (scoreDaOrSa.includes(index + 1) && ($(questionId).val() === 'DA' || $(questionId).val() === 'SA')) {
            totalPoints++;
        } else if (scoreDdOrSd.includes(index + 1) && ($(questionId).val() === 'DD' || $(questionId).val() === 'SD')) {
            totalPoints++;
        }
    }
    $('[id^=questions_]').attr("disabled", true);
	$('#assessScore').css( "display", "none" );
	$('#reAssessScore').css( "display", "inline" );
	$('#scoringMethodology').css( "display", "block" );
	$('#thankYouDiv').css( "display", "inline" );
	$('#score').val(totalPoints);
}

function reEvaluateAutismScore(){
	for (var index = 0; index < 50; index++) {
        var questionId = "#questions_" + (index + 1);
        $(questionId).val("DA");
        $(questionId).attr("disabled", false);
    }
	$('#assessScore').css( "display", "inline" );
	$('#reAssessScore').css( "display", "none" );
	$('#scoringMethodology').css( "display", "none" );
	$('#thankYouDiv').css( "display", "none" );
}