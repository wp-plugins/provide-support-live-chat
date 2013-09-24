//$ = jQuery.noConflict();
$ = jQuery.noConflict();
function generateRandomString(length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
$(document).ready(function(){
	//console.log('CHAT SCRIPT LOADED');
	//console.log(f7php);
	var globalDisabled = false;
	var emulateCount = 0;
	var requestWidget = false;
	var settingsLoaded = false;
	var depended = $('#buttonAvailablePages,#buttonAvailablePosts,#buttonAvailableOther,#buttonAvailableWhole,#buttonAvailableMain,.shortcodeSeparator').parent();
	checkAccount = function(){
		if(f7php.accountName != '' && f7php.accountHash != ''){
			$('.f7fields:eq(0) > .f7field > input').val(f7php.accountName);
			$('.f7fields:eq(1) > .f7field > input').val(f7php.accountHash);
			setTimeout(function(){$('#f7accountSubmit').trigger('click');},500);
			}
		}();
	f7emulate = function(obj,prop){
		emulateCount++;
		if(emulateCount>0){
				setTimeout(function(){if(prop) $(obj).prop('checked',true);$(obj).trigger('click');},100*emulateCount);
			}else{
				if(prop) $(obj).prop('checked',true);
				$(obj).trigger('click');
			}
		}
	hideControl = function (){
		$('#f7settings').children().not('.f7control').hide();
		}
	loadSettings = function (sett){
		//if(sett.pluginEnabled != ''){
			//if(sett.pluginEnabled && !settingsLoaded){
				//$('#f7settings').hide();
			if(!settingsLoaded){
				
				if(sett.pluginEnabled) {$('#f7pluginEnabled').attr('checked',true);f7emulate('.f7control');}
				if(sett.buttonImageType == 'graphic'){						
						f7emulate('.f7button1',true);			
					}else{
						f7emulate('.f7button2',true);	
						$('#buttonImageTextOnline').val(sett.buttonImageTextOnline);
						$('#buttonImageTextOffline').val(sett.buttonImageTextOffline);
						}
				if(sett.buttonImageSource == 'account'){
						f7emulate('.f7button3',true);
					}else{
						f7emulate('.f7button4',true);
						$('#buttonImageUrlOnline').val(sett.buttonImageUrlOnline);
						$('#buttonImageUrlOffline').val(sett.buttonImageUrlOffline);
					}
				if(sett.buttonLocation){			
					string = 'input[location='+sett.buttonLocation+']';
					f7emulate(string,true);
					if(sett.buttonLocation == 'fixed'){
						$('#buttonLocationVerticalValue').val(sett.buttonLocationVerticalValue);
						$('#buttonLocationHorizontalValue').val(sett.buttonLocationHorizontalValue);
						//---------------------------------
						if(sett.buttonLocationVerticalBy == 'px'){f7emulate('.f7button5');}else{f7emulate('.f7button6');}
						if(sett.buttonLocationHorizontalBy == 'px'){f7emulate('.f7button7');}else{f7emulate('.f7button8');}
						//---------------------------------
						if(sett.buttonLocationVerticalFrom == 'top'){f7emulate('.f7button9');}else{f7emulate('.f7button10');}
						if(sett.buttonLocationHorizontalFrom == 'left'){f7emulate('.f7button11');}else{f7emulate('.f7button12');}
						}				
					}
				if(sett.buttonAvailableMain){f7emulate('#buttonAvailableMain');}
				if(sett.buttonAvailablePages){
					f7emulate('#buttonAvailablePages');
					if(sett.buttonAvailablePagesWhich == 'all'){
						f7emulate('.f7button13',true);
					}else{
						f7emulate('.f7button14',true);
						for (id in sett.buttonAvailablePagesList){
							$('#selectPages').children('input[pageid='+sett.buttonAvailablePagesList[id]+']').trigger('click');
							}
						}
					}
				if(sett.buttonAvailablePosts){f7emulate('#buttonAvailablePosts');}
				if(sett.buttonAvailableOther){f7emulate('#buttonAvailableOther');}
				if(sett.buttonAvailableWhole){f7emulate('#buttonAvailableWhole');}
				
				settingsLoaded = true;
				//if(!sett.pluginEnabled) {
				//	$('#f7settings').children().not('.f7control').slideUp('fast');
				//	depended = $('#buttonAvailablePages,#buttonAvailablePosts,#buttonAvailableOther,#buttonAvailableWhole,#buttonAvailableMain,.shortcodeSeparator').parent();
				//	depended.hide();
				//	} 
				if(!sett.pluginEnabled) {f7emulate('.f7control'); f7emulate('.f7control');}
				setTimeout(function(){$('#f7submit').trigger('click');},2000);
				setTimeout(function(){$('#f7settings').fadeIn();$('#f7wait').remove();},100*emulateCount+200);
				}
			}
		//}
	
	$('#selectPages').hide();
	$('input[name=buttonAppearance]').parent().children('.settingInt').hide();
	$('input[name=customImages]').parent().children('.settingIntInt').hide();
	$('input[name=buttonLocation]').parent().children('.settingInt').hide();
	$('#buttonAvailablePages').parent().children('.settingInt').hide();
	//$('#f7settings').children().not('.f7control').hide();
	
	var validation = true;
	var validation2 = true;
	var f7settings = new Object();
	
	var f7message = $('#f7message');
	var f7messageFlag = false;
	setInterval(function(){checkMessage()},1000);
	checkMessage = function (){		
		if(f7message.html()!='' && !f7messageFlag){
			f7messageFlag = true;
			f7message.slideDown('fast');
			setTimeout(function(){f7message.slideUp('fast');f7message.empty();f7messageFlag=!f7messageFlag},8000);
			}
		}
	textMessage = function(message,type){
		f7message.html(message);
		type = type || 'info';
		if(type == 'warning'){
			f7message.addClass('f7warning');
		}else{
			f7message.removeClass('f7warning');
			}
		}
	eraseSettings = function (){	
		f7settings.pluginEnabled = false; // false || true
		f7settings.buttonImageType = false; // graphic || text 
		f7settings.buttonImageSource = false; // account || custom
		f7settings.buttonImageUrlOnline = false; // url
		f7settings.buttonImageUrlOffline = false; // url
		f7settings.buttonImageTextOnline = false; // text
		f7settings.buttonImageTextOffline = false; // text
		f7settings.buttonLocation = false // widget || fixed || shortcode
		f7settings.buttonLocationVerticalBy = false // pixel || percent
		f7settings.buttonLocationVerticalValue = false; // value
		f7settings.buttonLocationVerticalFrom = false; // top || bottom
		f7settings.buttonLocationHorizontalBy = false // pixel || percent
		f7settings.buttonLocationHorizontalValue = false; // value
		f7settings.buttonLocationHorizontalFrom = false; // top || bottom
		f7settings.buttonAvailableMain = false // || true
		f7settings.buttonAvailablePages = false; // ||true
		f7settings.buttonAvailablePagesWhich = false // all || selected
		f7settings.buttonAvailablePagesList = new Array(); // array(page id, page id)
		f7settings.buttonAvailablePosts = false // ||true
		f7settings.buttonAvailableOther = false // ||true
		f7settings.buttonAvailableWhole = false // ||true
		}	
	grabSettings = function (){
		f7settings.pluginEnabled = ($('#f7pluginEnabled').prop('checked'))? true : false;
		f7settings.buttonImageType = ($('#buttonImageType').prop('checked'))? 'graphic' : 'text';
		f7settings.buttonImageSource = ($('#buttonImageSource').prop('checked'))? 'account' : 'custom';
		f7settings.buttonImageUrlOnline = $('#buttonImageUrlOnline').val() || false;
		f7settings.buttonImageUrlOffline = $('#buttonImageUrlOffline').val() || false;
		f7settings.buttonImageTextOnline = $('#buttonImageTextOnline').val() || false;
		f7settings.buttonImageTextOffline = $('#buttonImageTextOffline').val() || false;
		$('input[name=buttonLocation]').each(function(index){
			if($(this).prop('checked')){f7settings.buttonLocation = $(this).attr('location');}
			});
		f7settings.buttonLocationVerticalValue = $('#buttonLocationVerticalValue').val() || false;	
		f7settings.buttonLocationVerticalBy = ($('#buttonLocationVerticalBy').prop('checked'))?	'px' : '%';
		f7settings.buttonLocationVerticalFrom = ($('#buttonLocationVerticalFrom').prop('checked'))? 'top' : 'bottom';	
		f7settings.buttonLocationHorizontalValue = $('#buttonLocationHorizontalValue').val() || false;
		f7settings.buttonLocationHorizontalBy = ($('#buttonLocationHorizontalBy').prop('checked')) ? 'px' : '%';
		f7settings.buttonLocationHorizontalFrom = ($('#buttonLocationHorizontalFrom').prop('checked'))? 'left' : 'right';		
		f7settings.buttonAvailablePages = ($('#buttonAvailablePages').prop('checked'))? true : false;
		f7settings.buttonAvailablePagesWhich = ($('#buttonAvailablePagesWhich').prop('checked'))? 'all' : 'selected';
		$('#selectPages > input').each(function(){
			currentInput = $(this);
			if(currentInput.prop('checked')){
				f7settings.buttonAvailablePagesList.push(currentInput.attr('pageid'));
				}
			});		
		f7settings.buttonAvailablePosts = ($('#buttonAvailablePosts').prop('checked'))? true : false ;	
		f7settings.buttonAvailableOther = ($('#buttonAvailableOther').prop('checked'))? true : false ;	
		f7settings.buttonAvailableWhole = ($('#buttonAvailableWhole').prop('checked'))? true : false ;	
		f7settings.buttonAvailableMain = ($('#buttonAvailableMain').prop('checked'))? true : false ;	
		//console.log(f7settings);
		};
	valid = function (obj,type){
		type = type || false;
		if($(obj).val() == ''){
				$(obj).addClass('novalid');
				if(!type) {validation = false;}
				else {validation2 = false;}
			}else{
				$(obj).removeClass('novalid');
			}
		}
	
	validate = function (){
		validation = true;
		if(f7settings.buttonImageType == 'graphic' && f7settings.buttonImageSource == 'custom'){
			valid('#buttonImageUrlOnline');
			valid('#buttonImageUrlOffline');
			}
		if(f7settings.buttonImageType == 'text'){
			valid('#buttonImageTextOnline');
			valid('#buttonImageTextOffline');
			}
		if(f7settings.buttonLocation == 'fixed'){
			valid('#buttonLocationVerticalValue');
			valid('#buttonLocationHorizontalValue');
			}
		//if(!validation) alert(validation);
		}
	validate2 = function (){
		validation2 = true;
		$('.f7fields > .f7field > input').removeClass('novalid');
		valid('.f7fields:eq(0) > .f7field > input',true);
			name = $('.f7fields:eq(0) > .f7field > input').val();
			pattern = new RegExp(/^[-a-z0-9_]{0,20}$/i);
			if(pattern.test(name)){		
			}else if(name != ''){
				textMessage('The account name should contain no more than 20 alphanumeric characters (Latin letters or digits), \'-\' (dashes), or \'_\' (underscore) characters. Spaces are not allowed.','warning');
				$('.f7fields:eq(0) > .f7field > input').addClass('novalid');
				validation2 = false;
				}
		valid('.f7fields:eq(1) > .f7field > input',true);
		pass = $('.f7fields:eq(1) > .f7field > input').val();
		if(pass.length > 20) {validation2 = false;$('.f7fields:eq(1) > .f7field > input').addClass('novalid');textMessage('The account password should contain no more than 20 characters.','warning');} 
		if(f7acc.type == 'new') {
				valid('.f7fields:eq(2) > .f7field > input',true);
				pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
				if(pattern.test($('.f7fields:eq(2) > .f7field > input').val())){
				}else{
					validation2 = false;
					$('.f7fields:eq(2) > .f7field > input').addClass('novalid');
					textMessage('Please enter a correct e-mail address','warning');
					}
			}
		checkFields();
		}
	checkFields = function (){
		$('.f7field input').each(function(){
			if($(this).hasClass('novalid')){
					$(this).attr('placeholder','This field is required!');
				}else{
					
					}
			});
		}
	
	$('#f7submit').on('click',function(){		
		eraseSettings();
		grabSettings();
		validate();
		if(f7settings.pluginEnabled+'' == 'false') validation = true;		
		if(validation){
			$('#f7livePreview').html('<img src="'+f7php.pluginsFolder+'/etc/img/wait.gif" width="30px" height="30px">');
			$(this).removeClass('novalidButton');
			ajaxData = {
				action : 'setsettings',
				settings : JSON.stringify(f7settings)
				}
			$.ajax({
				url : f7php.ajaxurl,
				type : 'POST',
				data : ajaxData
				}).done(function(msg){
					//textMessage(msg);
					//console.log(msg);
					});
			
			var json = {};
			json.hash = generateRandomString(4);
			json.locale = location.language || 'ru';
			json.fixed = false;
			json.codeType = 'script';
			json.appearance = 'graphics';
			json.companyLogin = f7accc.login;
			json.companyPasswordMD5Hash = f7accc.md5;
			var f7url = new Object();
			f7url.hidden = 'http://www.providesupport.com/api/chat-button/v1/get-code';
			f7url.text = 'http://www.providesupport.com/api/chat-button/v1/get-code';
			f7url.graphic = 'http://www.providesupport.com/api/chat-button/v1/get-code';
			f7url.featured = 'http://www.providesupport.com/api/chat-button/v1/get-code';		
			//console.log(':::START');
			if(f7settings.buttonImageType == 'graphic'){
				if(f7settings.buttonImageSource == 'account'){						
					requestCode(json,f7url.featured);
					//console.log('featured');	
					}
				if(f7settings.buttonImageSource == 'custom'){
					json.customImageUrls = {};
					json.customImageUrls.online = f7settings.buttonImageUrlOnline;
					json.customImageUrls.offline = f7settings.buttonImageUrlOffline;
					requestCode(json,f7url.graphic);
					//console.log('custom');
					}
				}else{
					json.appearance = 'text';
					json.chatLinkHtmls = {};
					json.chatLinkHtmls.online = f7settings.buttonImageTextOnline;
					json.chatLinkHtmls.offline = f7settings.buttonImageTextOffline;
					requestCode(json,f7url.text);
					//console.log('text');
				}
			if(f7settings.buttonAvailableWhole){
				json.appearance = 'hidden';
				requestCode(json,f7url.hidden,true);
				}
			//console.log(json);
		}else{
			$(this).addClass('novalidButton');
			}
		});	
		
	$('#f7pagesSubmit').on('click',function(){
			setTimeout(function(){$('#selectPages').slideUp('fast')},100);
		});
		
	hideshow = function (obj,type){		
		$(obj).parent().on('click',function(){
			$(obj).parent().each(function(){
				currentSetting = $(this);
				if(currentSetting.children('input').prop('checked')){
					currentSetting.children(type).slideDown('fast');
				}else{
					currentSetting.children(type).slideUp('fast');
					}
				});
			});
		}
	hideshow('input[name=buttonAppearance]','.settingInt');	
	hideshow('input[name=customImages]','.settingIntInt');
	hideshow('input[name=buttonLocation]','.settingInt');
	hideshow('#buttonAvailablePages','.settingInt');
	hideshow('input[name=optionPages]','#selectPages');
	
	requestCode = function (json,url,format){
		format = format || false;
		url = location.protocol + '//www.providesupport.com/api/chat-button/v1/get-code';
		$.ajax({
			type : 'GET', url : url,
			dataType : 'jsonp',
			contentType : "application/json",
			data : {
				jsonParam: JSON.stringify(json)
			},
			async: false,
			success : function (msg) {
				//console.log(msg.code);
				if(!format) {
					$('#f7livePreview').html('Your live chat link example: <br />'+msg.code);
				}
				setCode(msg.code, format);
				}
			});
		}
	
	setCode = function (value, type) {
		type = type || false;
		value = value || false;
		ajaxData = {
			action : 'setcode',
			type : type,
			value : value 
			}
		$.ajax({
			url : f7php.ajaxurl,type : 'POST',
			data : ajaxData	
			}).done(function(msg){
				//console.log('EX :: '+msg);
				});
		}
	
	$('.f7control').on('click',function(){
		if($('input[location=shortcode]').attr('checked') == 'checked'){
			nnot = depended;
			}else{
				nnot = '';
				}
		if($(this).children('input').attr('checked') == 'checked'){
			$('#f7settings').children().not('.f7control').not(nnot).slideDown('fast');
		}else{
			$('#f7settings').children().not('.f7control').not(nnot).slideUp('fast');
			}
		});
		
	$(".f7r").on("click",function(){  /*  DUPLICATE IN PLUGIN.PHP */
		console.log("click");
		$(".f7r").not($(this)).prop("checked",false);
		});
		
	$('input[location]').on('click',function(){
		shortcode = $('input[location=shortcode]');
		dep = depended;
		if(shortcode.attr('checked') == 'checked') {
			dep.hide('fast');
			}
		if(shortcode.attr('checked') != 'checked') {
			dep.show('fast');
			}
		});
	
	$('a[href="/wp-admin/widgets.php"]').on('click',function(e){
		e.preventDefault();
		if($('input[location=widget]').prop('checked')){
			$('a[href="/wp-admin/widgets.php"]').show('fast');
			requestWidget = location.protocol+'//'+location.host+$(this).attr('href');
			$('#f7submit').trigger('click');
			if(validation) setTimeout(function(){
				//window.open(requestWidget)
				location = '/wp-admin/widgets.php';
				},1100);
		}else{
			//console.log(location);
			$('a[href="/wp-admin/widgets.php"]').hide('fast');
			}
		});
	if($('input[location=widget]').prop('checked')){$('a[href="/wp-admin/widgets.php"]').fadeOut('fast');}	
		$('input[name=buttonLocation]').on('click',function(){
			if($('input[location=widget]').prop('checked')){
				$('a[href="/wp-admin/widgets.php"]').fadeIn('fast');
			}else{
				$('a[href="/wp-admin/widgets.php"]').fadeOut('fast');
				}	
			});
	
	
	$('#f7buttonE').on('click',function(){
		$('.f7field input').removeClass('novalid').attr('placeholder','');
		$('#f7buttonN').removeClass('f7buttonNoBorder');
		$(this).addClass('f7buttonNoBorder');
		$('.f7fields').eq(2).slideUp();
		$('#f7accountSubmit').html('Connect to Account');
		});
	$('#f7buttonN').on('click',function(){
		$('.f7field input').removeClass('novalid').attr('placeholder','');
		$('#f7buttonE').removeClass('f7buttonNoBorder');
		$(this).addClass('f7buttonNoBorder');
		$('.f7fields').eq(2).slideDown();
		$('#f7accountSubmit').html('Create Account and connect');
		});
	
	var f7acc = new Object();
	var f7accc = new Object();
	accErase = function (){
		f7acc.type = '';
		f7acc.name = '';
		f7acc.pass = '';
		f7acc.mail = '';
		};
	accGrub = function (){
		f7acc.type = ($('#f7buttonE').hasClass('f7buttonNoBorder'))? 'existing' : 'new';
		f7acc.name = $('.f7fields').eq(0).children('.f7field').children('input').val() || '';
		f7acc.pass = $('.f7fields').eq(1).children('.f7field').children('input').val() || '';
		f7acc.mail = $('.f7fields').eq(2).children('.f7field').children('input').val() || '';
		}
			
	f7opensettings = function(){
		if(f7php.settings+'' == 'null') {
			f7php.settings = new Object();
			f7php.settings.pluginEnabled = true;
			f7php.settings.buttonImageType = 'graphic';
			f7php.settings.buttonImageSource = 'account';
			f7php.settings.buttonLocation = 'fixed';
			f7php.settings.buttonLocationVerticalBy = '%';
			f7php.settings.buttonLocationVerticalValue = '50';
			f7php.settings.buttonLocationVerticalFrom = 'bottom';
			f7php.settings.buttonLocationHorizontalBy = '%';
			f7php.settings.buttonLocationHorizontalValue = '0';
			f7php.settings.buttonLocationHorizontalFrom = 'right';
			f7php.settings.buttonAvailableMain = true
			f7php.settings.buttonAvailablePages = true
			f7php.settings.buttonAvailablePagesWhich = 'all';
			f7php.settings.buttonAvailablePosts = true;
			f7php.settings.buttonAvailableOther = true;
			f7php.settings.buttonAvailableWhole = true;			
			}				
		if(f7php.settings.pluginEnabled+'' == 'true') {$('#f7settings').slideDown();}else{
			$('#f7wait').html('<img src="'+f7php.pluginsFolder+'/etc/img/wait.gif" width="30px" height="30px">');
			}
		$('#f7submit').slideDown();
		$('#f7account').slideUp();	
		loadSettings(f7php.settings);
		}
	f7login = function (){
		f7accc.login = f7acc.name;
		f7accc.md5 = CryptoJS.MD5(f7acc.pass)+'';
		accountInfo = '';
		accountInfo += 'Connected to account : ';
		accountInfo += '<b>' + f7accc.login + '</b>';
		if(f7acc.type == 'existing'){	
			accountInfo += '<br /><br /><div id="f7oldaccountDetails">To go online and start answering chat requests, please install the <a target="_blank" href = "http://www.providesupport.com/downloads/index.html?utm_source=wp-plugin&utm_medium=settings&utm_campaign=Plugins" style="text-decoration: none">Operator Console</a> ';
			accountInfo += 'and login with the credentials available on your account <a target="_blank" href="https://admin.providesupport.com/view/my-account/operators-and-departments?utm_source=wp-plugin&utm_medium=settings&utm_campaign=Plugins" style="text-decoration: none">Operators and Departments</a> page.';
			accountInfo += '<br />To customize your live chat appearance, please use available settings in your account <a target="_blank" href = "https://admin.providesupport.com/view/my-account/dashboard?utm_source=wp-plugin&utm_medium=settings&utm_campaign=Plugins" style="text-decoration: none">Control Panel</a>.';
			accountInfo += '</div>';
		}
		if(f7acc.type == 'new'){		
			accountInfo += '<br /><br /><div id="f7newaccountDetails">To start using the live chat service and appear online please install the <a target="_blank" href = "http://www.providesupport.com/downloads/index.html?utm_source=wp-plugin&utm_medium=settings&utm_campaign=Plugins" style="text-decoration: none">Operator Console</a> ';
			accountInfo += 'and login with the following credentials:';
			accountInfo += '<br /><br />Account Name: <b>' + f7acc.name + '</b>';
			accountInfo += '<br />Operator Login: <b>' + f7acc.name + '</b>';
			accountInfo += '<br />Operator Password: <b>' + f7acc.pass + '</b>';
			accountInfo += '<br /><br />To customize your live chat appearance and configure other settings, please use your account <a target="_blank" href = "https://admin.providesupport.com/action/main/company/company-login?login=' + f7acc.name + '&password=' + f7acc.pass + '" style="text-decoration: none">Control Panel</a>.';
			accountInfo += '</div>';
		}
		accountInfo += '<br /><div id="f7anotherAccount" style="margin:5px auto;width:285px;">Connect to another Provide Support account</div>';
		$('#f7accountInfo').html(accountInfo);
		$('#f7anotherAccount').on('click',function(){
			ajaxData = {
				action : 'setaccount',
				accountName : '',
				accountHash : ''
				}
			$.ajax({
				url : f7php.ajaxurl,type : 'POST',
				data : ajaxData	
				}).done(function(msg){
					location.reload();
					});
				
			});
		f7opensettings();
		ajaxData = {
			action : 'setaccount',
			accountName : f7accc.login,
			accountHash : f7acc.pass
			}
		$.ajax({
			url : f7php.ajaxurl,type : 'POST',
			data : ajaxData	
			}).done(function(msg){
				//console.log('EX :: '+msg);
				});
		}	
	
	$('#f7accountSubmit').on('click',function(){
		accErase();
		accGrub();
		validate2();
		if(validation2){
			$('#f7accountSubmit').append('<img id="accountWait" style="position:absolute;top:-2px;right:-38px;" src="'+f7php.pluginsFolder+'/etc/img/wait.gif" width="30px" height="30px">');
			var accSet = {}		
			if(f7acc.type == 'existing'){
				url = 'https://www.providesupport.com/api/account/v1/companies/' + f7acc.name+'?companyLogin='+f7acc.name+'&companyPasswordMD5Hash='+CryptoJS.MD5(f7acc.pass);
				//console.log(url);
				$.ajax({
					type : 'GET', url : url,
					dataType : 'jsonp',
					data : {},
					async: false,
					success : function (msg) {
						//console.log(msg);
						if(typeof msg.company != 'undefined') {f7login();}
						if(msg.error == 'incorrect-password-md5-hash') {textMessage('Incorrect password', 'warning');	}		
						else if(msg.error == 'no-such-company') {textMessage(msg.errorDescription, 'warning');}
							else{
								if(msg.errorDescription != ''){
									textMessage(msg.errorDescription,'warning')
								}else{
									textMessage(msg.error,'warning')	
									}
								}
						//console.log(msg);
						$('#accountWait').remove();
						}
					}).done(function(){$('#accountWait').remove();});
				
				}
			if(f7acc.type == 'new'){
				accSet = {}	
				accSet.companyLogin = f7acc.name;
				//accSet.companyPassword = CryptoJS.MD5(f7acc.pass)+'';
				accSet.companyPassword = f7acc.pass;
				accSet.email = f7acc.mail;
				accSet.caller = 'wordpess-plugin-1.1';
				$.ajax({
					url : 'https://www.providesupport.com/api/account/v1/companies/?method=post',				
					dataType : 'jsonp',
					data : {
						params: JSON.stringify(accSet)
					},
					success : function (msg) {
						//console.log(msg);
						if(msg.error == 'duplicate-company-login') {textMessage('Account name "'+f7acc.name+'" is taken','warning')}
						else if(msg.result == 'success'){
							f7login();
							}else{
								if(msg.errorDescription != ''){
									textMessage(msg.errorDescription,'warning')
								}else{
									textMessage(msg.error,'warning')	
									}
								}
						$('#accountWait').remove()();
						}
					}).done(function(){$('#accountWait').remove();});
				}
			}
		});
});



