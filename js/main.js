(function ($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function () {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function () {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function () {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function () {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel
	$('#about-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 15,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		dots: true,
		autoplay: true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop: true,
		margin: 15,
		dots: true,
		nav: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			992: {
				items: 2
			}
		}
	});

})(jQuery);

jQuery('.mm-prev-btn').hide();

var x;
var count;
var current;
var percent;
var z = [];

init();
getCurrentSlide();
goToNext();
goToPrev();
getCount();
// checkStatus();
// buttonConfig();
buildStatus();
deliverStatus();
submitData();
goBack();
// var current_page = 0;
var page_btn_map = {
	"page1": "",
	"page2": "survey-form-basic",
	"page3": "survey-form-section2",
	"page4": "survey-form-section3"
 }
 var current_page = -1;

 var adhd_page_map = {
	0: "",
	1: "adhd-survey-form-section2",
	2: "adhd-survey-form-section3",
	3: "adhd-survey-form-section4",
	4: "adhd-survey-form-section5",
	5: "adhd-survey-form-section6"
 }
 var autism_page_map = {
	0: "",
	1: "autism-survey-form-section2",
	2: "autism-survey-form-section3",
	3: "autism-survey-form-section4",
	4: "autism-survey-form-section5",
	5: "autism-survey-form-section6",
	6: "autism-survey-form-section7",
	7: "autism-survey-form-section8",
	8: "autism-survey-form-section9",
	9: "autism-survey-form-section10",
	10: "autism-survey-form-section11",
	11: "autism-survey-form-section12",
	12: "autism-survey-form-section13"

 }
 var page_map = adhd_page_map;

 if (window.location.href.indexOf("autism.html")>0){
	page_map = autism_page_map;
 }
 
function init() {

	

	jQuery('.mm-survey-container .mm-survey-page').each(function () {

		var item;
		var page;

		item = jQuery(this);
		page = item.data('page');

		item.addClass('mm-page-' + page);
		//item.html(page);

	});

}

function getCount() {

	count = jQuery('.mm-survey-page').length;
	return count;

}

function goToNext() {
	goToSlide(x);
		getCount();
		current = x + 1;
		var g = current / count;
		buildProgress(g);
		var y = (count + 1);
		getButtons();
		jQuery('.mm-survey-page').removeClass('active');
		jQuery('.mm-page-' + current).addClass('active');
		getCurrentSlide();
		checkStatus();
		if (jQuery('.mm-page-' + count).hasClass('active')) {
			if (jQuery('.mm-page-' + count).hasClass('pass')) {
				jQuery('.mm-finish-btn').addClass('active');
			}
			else {
				jQuery('.mm-page-' + count + ' .mm-survery-content .mm-survey-item').on('click', function () {
					jQuery('.mm-finish-btn').addClass('active');
				});
			}
		}
		else {
			jQuery('.mm-finish-btn').removeClass('active');
			if (jQuery('.mm-page-' + current).hasClass('pass')) {
				jQuery('.mm-survey-container').addClass('good');
				jQuery('.mm-survey').addClass('okay');
			}
			else {
				jQuery('.mm-survey-container').removeClass('good');
				jQuery('.mm-survey').removeClass('okay');
			}
		}
		buttonConfig();

	
}

function goToPrev() {
	goToSlide(x);
		getCount();
		current = (x - 1);
		var g = current / count;
		buildProgress(g);
		var y = count;
		getButtons();
		jQuery('.mm-survey-page').removeClass('active');
		jQuery('.mm-page-' + current).addClass('active');
		getCurrentSlide();
		checkStatus();
		jQuery('.mm-finish-btn').removeClass('active');
		if (jQuery('.mm-page-' + current).hasClass('pass')) {
			jQuery('.mm-survey-container').addClass('good');
			jQuery('.mm-survey').addClass('okay');
		}
		else {
			jQuery('.mm-survey-container').removeClass('good');
			jQuery('.mm-survey').removeClass('okay');
		}
		buttonConfig();

	

}

$(document).ready(function() {
	$.validator.setDefaults({
		submitHandler: function() {
			alert("Submitted!");
		}
	});
	$("#adhd-survey-form-section2").validate({
		rules: {
			email: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			age: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			gender: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			domain: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			}
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
			return false;
		}
	});
	$("#adhd-survey-form-section3").validate({
		rules: {
			q1: {
				required: true,
			},
			q2: {
				required: true,
			},
			q3: {
				required: true,
			},
			q4: {
				required: true,
			},
			q5: {
				required: true,
			},
			q6: {
				required: true,
			},
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#adhd-survey-form-section4").validate({
		rules: {
			q7: {
				required: true,
			},
			q8: {
				required: true,
			},
			q9: {
				required: true,
			},
			q10: {
				required: true,
			},
			q11: {
				required: true,
			},
			q12: {
				required: true,
			},
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi")
		}
	});
	$("#adhd-survey-form-section5").validate({
		rules: {
			q13: {
				required: true,
			},
			q14: {
				required: true,
			},
			q15: {
				required: true,
			},
			q16: {
				required: true,
			},
			q17: {
				required: true,
			},
			q18: {
				required: true,
			},
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			$(form).submit();
			//console.log("Hi")
		}
	});
	$("#adhd-survey-form-section6").validate({
		rules: {
			name: {
				required: true,
				// Using the normalizer to trim the value of the element
				// before validating it.
				//
				// The value of `this` inside the `normalizer` is the corresponding
				// DOMElement. In this example, `this` references the `username` element.
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			email: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			age: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			gender: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			domain: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			}
		},
		// submitHandler: function (form) {
		// 	// some other code
		// 	// maybe disabling submit button
		// 	// then:
		// 	// $(form).submit();
		// 	console.log("Hi")
		// }
	});


	// autism forms
	$("#autism-survey-form-section2").validate({
		rules: {
			email: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			age: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			gender: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			},
			domain: {
				required: true,
				normalizer: function (value) {
					return $.trim(value);
				}
			}
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
			return false;
		}
	});
	$("#autism-survey-form-section3").validate({
		rules: {
			q1: {
				required: true,
			},
			q2: {
				required: true,
			},
			q3: {
				required: true,
			},
			q4: {
				required: true,
			},
			q5: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section4").validate({
		rules: {
			q6: {
				required: true,
			},
			q7: {
				required: true,
			},
			q8: {
				required: true,
			},
			q9: {
				required: true,
			},
			q10: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section5").validate({
		rules: {
			q11: {
				required: true,
			},
			q12: {
				required: true,
			},
			q13: {
				required: true,
			},
			q14: {
				required: true,
			},
			q15: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section6").validate({
		rules: {
			q16: {
				required: true,
			},
			q17: {
				required: true,
			},
			q18: {
				required: true,
			},
			q19: {
				required: true,
			},
			q20: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section7").validate({
		rules: {
			q21: {
				required: true,
			},
			q22: {
				required: true,
			},
			q23: {
				required: true,
			},
			q24: {
				required: true,
			},
			q25: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section8").validate({
		rules: {
			q26: {
				required: true,
			},
			q27: {
				required: true,
			},
			q28: {
				required: true,
			},
			q29: {
				required: true,
			},
			q30: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section9").validate({
		rules: {
			q31: {
				required: true,
			},
			q32: {
				required: true,
			},
			q33: {
				required: true,
			},
			q34: {
				required: true,
			},
			q35: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section10").validate({
		rules: {
			q36: {
				required: true,
			},
			q37: {
				required: true,
			},
			q38: {
				required: true,
			},
			q39: {
				required: true,
			},
			q40: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section11").validate({
		rules: {
			q41: {
				required: true,
			},
			q42: {
				required: true,
			},
			q43: {
				required: true,
			},
			q44: {
				required: true,
			},
			q45: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	$("#autism-survey-form-section12").validate({
		rules: {
			q46: {
				required: true,
			},
			q47: {
				required: true,
			},
			q48: {
				required: true,
			},
			q49: {
				required: true,
			},
			q50: {
				required: true,
			}
	
		},
		submitHandler: function (form) {
			// some other code
			// maybe disabling submit button
			// then:
			// $(form).submit();
			console.log("Hi");
			goToNext();
			// else
			goToPrev();
		}
	});
	jQuery('.mm-next-btn').on('click', function () {
		current_page = current_page + 1;
		if (current_page == 0) {
			goToNext();
			return;
		}
		
		var form_id = page_map[current_page];
		
		// $(`#${form_id}`).validate();
		if (!$(`#${form_id}`).valid()) {
			// alert("sorry please correct form!");
			current_page = current_page - 1;
			return false;
		} else {
			goToNext();
		}
		$(`#${form_id}`).trigger("submit");

		
	});
	jQuery('.mm-prev-btn').on('click', function () {
		current_page = current_page - 1;
		var form_id = page_map[current_page];
		$(`#${form_id}`).trigger("submit");

		if (!$(`#${form_id}`).valid()) {
			// alert("sorry please correct form!");
			current_page = current_page + 1;
			return false;
		} else {
			goToPrev();
		}
		$(`#${form_id}`).trigger("submit");

		
	});
});

let adhd_score_interpretations = [[{
		min: 0,
		max: 0,
		text: "No ADHD traits"
	},
	{
		min: 1,
		max: 2,
		text: "Mild ADHD traits"
	},
	{
		min: 3,
		max: 3,
		text: "Moderate ADHD traits"
	},
	{
		min: 4,
		max: 6,
		text: "Strong ADHD traits"
	}],[{
		min: 0,
		max: 0,
		text: "You do not exhibit any ADHD symptoms"
	},
	{
		min: 1,
		max: 4,
		text: "You exhibit few ADHD symptoms"
	},
	{
		min: 5,
		max: 8,
		text: "You exhibit some ADHD symptoms"
	},
	{
		min: 9,
		max: 12,
		text: "You exhibit many ADHD symptoms"
	}] 

]

let autism_score_interpretations = [
	[{
		min: 0,
		max: 11,
		text: "No tendency at all towards autistic traits"
	},
	{
		min: 12,
		max: 21,
		text: "Average result that people get (women average around 15 and men around 17)"
	},
	{
		min: 22,
		max: 25,
		text: "Autistic tendencies slightly above the population average"
	},
	{
		min: 26,
		max: 31,
		text: "Borderline indication of autism, or mild autism"
	},
	{
		min: 32,
		max: 50,
		text: "Strong likelihood of autism"
	}
]
]

function saveAndCalculateScore(form_type) {
	let serialized_data = {FormType: form_type}
	let user_form_id = form_type === 0 ? "#adhd-survey-form-section2" : "#autism-survey-form-section2";
	let user_data = $(user_form_id).serializeArray();
	let user_details = {};
	user_data.forEach((ud) => user_details[ud.name] = ud.value);
	let responses = [];
	// let start = form_type === 0 ? 2 : 
	let end = form_type === 0 ? 7 : 13;
	for(var i=3; i<end; i++) {
		var data = $(`#adhd-survey-form-section${i}`).serializeArray();
		responses = [...responses, ...data.map((d) => d.value)];
	}
	console.log("serialized-data", serialized_data);
	serialized_data['Responses'] = responses;
	serialized_data['UserDetails'] = user_details;
	$.ajax(
		{
			type: 'POST',
			url: "https://orchvatefunctionappsassessmentvalidation.azurewebsites.net/api/AssessmentValidationAndScoringFunction?code=Bc-eGlqCLDZeLY7OVtfZpnXzAkt1TgZ6r7hmZ_lWFqwvAzFutxoK9A==",
			data: JSON.stringify(serialized_data),
    		contentType : 'application/json',
			dataType : 'json',
			success: function(res) {
				console.log(res);
				var container_ids = form_type === 0 ? ['#part-a-score', '#part-b-score'] : ["#assessment-score"];
				if (res.statusCode == 200) {
					res.value.forEach((v, index) => {
						$(container_ids[index]).html(v);
					});
					var interpretations_obj = form_type === 0 ? adhd_score_interpretations : autism_score_interpretations;
					var container_desc_ids = form_type === 0 ? ['#part-a-description', '#part-b-description'] : ["#part-description"];
					res.value.forEach((v, index) => {
						let desc_obj = interpretations_obj[index].find((inter) => {
							if (v >= inter.min && v <= inter.max) {
								return true;
							}
							return false;
						})
						$(container_desc_ids[index]).html(desc_obj.text);
					});

				

				}
			}

	})

}



function buildProgress(g) {

	if (g > 1) {
		g = g - 1;
	}
	else if (g === 0) {
		g = 1;
	}
	g = g * 100;
	jQuery('.mm-survey-progress-bar').css({ 'width': g + '%' });

}

function goToSlide(x) {

	return x;

}

function getCurrentSlide() {

	jQuery('.mm-survey-page').each(function () {

		var item;

		item = jQuery(this);

		if (jQuery(item).hasClass('active')) {
			x = item.data('page');
		}
		else {

		}

		return x;

	});

}

function getButtons() {

	if (current === 0) {
		current = y;
	}
	if (current === count) {
		jQuery('.mm-next-btn').hide();
	}
	else if (current === 1) {
		jQuery('.mm-prev-btn').hide();
	}
	else {
		jQuery('.mm-next-btn').show();
		jQuery('.mm-prev-btn').show();
	}

}

jQuery('.mm-survey-q li input').each(function () {

	var item;
	item = jQuery(this);

	jQuery(item).on('click', function () {
		if (jQuery('input:checked').length > 0) {
			// console.log(item.val());
			jQuery('label').parent().removeClass('active');
			item.closest('li').addClass('active');
		}
		else {
			//
		}
	});

});

percent = (x / count) * 100;
jQuery('.mm-survey-progress-bar').css({ 'width': percent + '%' });

function checkStatus() {
	jQuery('.mm-survery-content .mm-survey-item').on('click', function () {
		var item;
		item = jQuery(this);
		item.closest('.mm-survey-page').addClass('pass');
	});
}

function buildStatus() {
	jQuery('.mm-survery-content .mm-survey-item').on('click', function () {
		var item;
		item = jQuery(this);
		item.addClass('bingo');
		item.closest('.mm-survey-page').addClass('pass');
		jQuery('.mm-survey-container').addClass('good');
	});
}

function deliverStatus() {
	jQuery('.mm-survey-item').on('click', function () {
		if (jQuery('.mm-survey-container').hasClass('good')) {
			jQuery('.mm-survey').addClass('okay');
		}
		else {
			jQuery('.mm-survey').removeClass('okay');
		}
		buttonConfig();
	});
}

function lastPage() {
	if (jQuery('.mm-next-btn').hasClass('cool')) {
		alert('cool');
	}
}

function buttonConfig() {
	if (jQuery('.mm-survey').hasClass('okay')) {
		jQuery('.mm-next-btn button').prop('disabled', false);
	}
	else {
		jQuery('.mm-next-btn button').prop('disabled', false);
	}
}

function submitData() {
	jQuery('.mm-finish-btn').on('click', function () {
		collectData();
		jQuery('.mm-survey-bottom').slideUp();
		jQuery('.mm-survey-results').slideDown();
	});
}

function collectData() {

	var map = {};
	var ax = ['0', 'red', 'mercedes', '3.14', '3'];
	var answer = '';
	var total = 0;
	var ttl = 0;
	var g;
	var c = 0;

	jQuery('.mm-survey-item input:checked').each(function (index, val) {
		var item;
		var data;
		var name;
		var n;

		item = jQuery(this);
		data = item.val();
		name = item.data('item');
		n = parseInt(data);
		total += n;

		map[name] = data;

	});

	jQuery('.mm-survey-results-container .mm-survey-results-list').html('');

	for (i = 1; i <= count; i++) {

		var t = {};
		var m = {};
		answer += map[i] + '<br>';

		if (map[i] === ax[i]) {
			g = map[i];
			p = 'correct';
			c = 1;
		}
		else {
			g = map[i];
			p = 'incorrect';
			c = 0;
		}

		jQuery('.mm-survey-results-list').append('<li class="mm-survey-results-item ' + p + '"><span class="mm-item-number">' + i + '</span><span class="mm-item-info">' + g + ' - ' + p + '</span></li>');

		m[i] = c;
		ttl += m[i];

	}

	var results;
	results = ((ttl / count) * 100).toFixed(0);

	jQuery('.mm-survey-results-score').html(results + '%');

}

function goBack() {
	jQuery('.mm-back-btn').on('click', function () {
		jQuery('.mm-survey-bottom').slideDown();
		jQuery('.mm-survey-results').slideUp();
	});
}
let userName = document.getElementById("txtUserName");
let email = document.getElementById("txtEmail");
let pwd = document.getElementById("txtPwd");
let conPwd = document.getElementById("txtConPwd");
let form = document.querySelector("form");

function validateInput() {
	const userName = $("#name").val();
	const email = $("#email").val();

	//check username is empty 
	if (userName && userName.value.trim() === "") {
		onError(userName, "User Name cannot be empty");
	} else {
		onSuccess(userName);
	}
	if (email && email.value.trim() === "") {
		onError(email, "Email cannot be empty");
	} else {
		if (!isValidEmail(email.value.trim())) {
			onError(email, "Email is not valid");
		} else {
			onSuccess(email);
		}
	}
}

document.querySelector("button")
	.addEventListener("click", (event) => {
		event.preventDefault();
		validateInput();
	});

function onSuccess(input) {
	let parent = input.parentElement;
	let messageEle = parent.querySelector("small");
	messageEle.style.visibility = "hidden";
	parent.classList.remove("error");
	parent.classList.add("success");
}
function onError(input, message) {
	let parent = input.parentElement;
	let messageEle = parent.querySelector("small");
	messageEle.style.visibility = "visible";
	messageEle.innerText = message;
	parent.classList.add("error");
	parent.classList.remove("success");

}

function isValidEmail(email) {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
