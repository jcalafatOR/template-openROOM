/*********************
 ** JS BE CONTENT
 **    0- BASIC LOADS
 **    1- UIKIT.MIN
 **    2- UI JQUERY
 **    3- MOMENT.MIN JS
 **    4- import MOMENT LOCALE
 **    5- DATE RANGE PICKER
 **    6- BE JS
 ** */
 /* PRE CHECK*/

if (window.CSS && CSS.supports('color', 'var(--fake-var)')) {
 
/*** 0- BASIC SCRIPTS ***/
/**** DOCUMENT READY ****/
jQuery(document).ready(function()
{
  /** SAFARI EXCEPTIONS **/
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  if(isSafari){ console.log("Safari2: "+isSafari); jQuery('body').addClass('isSafari'); }
  /**** LOPD CHECKER ****/
  if (typeof check_cookie === "function" && typeof getBaseURL === "function") { 
    // safe to use the function
    check_cookie(getBaseURL());
  }
  /** CLICK AND SCROLL LEFT **/
  var ordragnmove_x,ordragnmove_left;
	var ordragnmove_down = [];
  
	jQuery(".slide-scroller").mousedown(function(e){
		e.preventDefault();
		ordragnmove_down[0] = true;
		ordragnmove_x = e.pageX;
		ordragnmove_left = jQuery(this).scrollLeft();
	});
	
	jQuery(".m-slide-scroller").mousedown(function(e){
  
		if(checkMobileSize())
		{
			e.preventDefault();
			ordragnmove_down[1] = true;
			ordragnmove_x = e.pageX;
			ordragnmove_left = jQuery(this).scrollLeft();
		}
	});
	
	jQuery("body").mousemove(function(e){
		var newX;
		if(ordragnmove_down[0]){
			newX = e.pageX;
			jQuery(".slide-scroller").scrollLeft(ordragnmove_left - newX + ordragnmove_x); 
		}
		if(ordragnmove_down[1]){
			newX = e.pageX;
			jQuery(".m-slide-scroller").scrollLeft(ordragnmove_left - newX + ordragnmove_x);    
		}
	});
	
	jQuery("body").mouseup(function(){
  
    ordragnmove_down[0] = false;
    ordragnmove_down[1] = false;
  });
  
  /** RESIZE HEADER **/
  resizeHeader();
	jQuery( window ).resize(function()
	{
		if(!checkMobileSize())
		{
			// ** Si no es mobile comprobamos el contenido del cajetin
			resizeHeader();
		}
	});
  /**** OR CARROUSEL ****/
  window.addEventListener('orientationchange', function(){ setTimeout(orCarrouselRestart(), 500); });
  /** OR Content Flip **/ 
  window.addEventListener('orientationchange', function(){ or_cflip_reset(); });
  
    /**** -= Deploy Content CARROUSEL =- ****/
    jQuery('.or-deploy-target').on('click', function(){
      orCarrouselDeploy(this);      
    });
    /**** -= LOAD CARROUSEL =- ****/
  if(jQuery('.or-carrousel-target').length > 0)
  {
    // Por cada Carrousel...
    
    var orCarrouselCount = -1;
    jQuery('.or-carrousel-target').each(function(){
      var autoplay = jQuery(this).hasClass('stoped');
      orCarrouselCount++;
      orCarrouselList[orCarrouselCount] = jQuery(this);
      
      // Asignar valores
      orCarrouselSetValues(orCarrouselCount, this);
      
      // Añadir botones de navegación
      var contenedor_w = jQuery(this).width();
      var contenedor_h = jQuery(this).height();
      jQuery(this).append('<div class="or-carrousel-target-controller active"><span class="oricon-longarrow prev" rel="'+orCarrouselCount+'"></span><span class="oricon-longarrow next" rel="'+orCarrouselCount+'"></span></div>');
      jQuery('.or-carrousel-target-controller',this).css("width", contenedor_w+"px");
      jQuery('.or-carrousel-target-controller',this).css("height", contenedor_h+"px");
      // Creamos el interval
      if(!autoplay)
      {
        switch(orCarrouselCount)
        {
          case 0: orCarrouselIntervals[0] = setInterval(function(){ orCarrouselNext(0); }, 5000); break;
          case 1: orCarrouselIntervals[1] = setInterval(function(){ orCarrouselNext(1); }, 5000); break;
          case 2: orCarrouselIntervals[2] = setInterval(function(){ orCarrouselNext(2); }, 5000); break;
          default:
            orCarrouselIntervals[orCarrouselCount] = setInterval(function(){ orCarrouselNext(orCarrouselCount); }, 5000);
            break;
        }
      }
      
    });
    
  }
  jQuery('.or-carrousel-target .next').on('click', function(){
    var item = jQuery(this).attr('rel');
    var autoplay = jQuery(this).closest('.or-carrousel-target').hasClass('stoped');
    if(!autoplay){ clearInterval(orCarrouselIntervals[item]);}
    orCarrouselNext(item);
    if(!autoplay){ orCarrouselIntervals[item] = setInterval(function(){ orCarrouselNext(item); }, 5000); }
  });
  jQuery('.or-carrousel-target .prev').on('click', function(){
    var item = jQuery(this).attr('rel');
    var autoplay = jQuery(this).closest('.or-carrousel-target').hasClass('stoped');
    if(!autoplay){ clearInterval(orCarrouselIntervals[item]); }
    orCarrouselPrev(item);
    if(!autoplay){ orCarrouselIntervals[item] = setInterval(function(){ orCarrouselNext(item); }, 5000); }
  });
  /*** OR_CUSTOM CARROUSEL ***/
  
	jQuery('.or_customCarrouselItem').on('click', function()
		{ or_customCarrouselAction(jQuery(this), 1); });
	
	jQuery('.or_customCarrouselMove > span').on('click', function()
	{
		var modulo = jQuery(this).closest('.or_customCarrousel');
		if(modulo.hasClass('tolist')) // El 3 mueve las miniaturas
    {	or_customCarrouselAction(jQuery(this), 3); }
    else	// El 2 mueve las ampliaciones
		{ or_customCarrouselAction(jQuery(this), 2); }
		
	});
	
  /*** -END- OR_CUSTOM CARROUSEL ***/
  /*** Mod Slider OR ***/
	var orsl_intervalList = [];
	jQuery('.or_slider_content').each(function(index) {
		var orsl_block = jQuery('.or_slider_contentBlocks', this);
		jQuery('.or_slider_move', this).attr('rel', index);
		var orsl_blockWidth = orsl_block.width();
		var orsl_timer = parseInt(orsl_block.attr('rel-timer'));
		var orsl_speed = parseInt(orsl_block.attr('rel-speed'));
		var orsl_index = index;
		var orsl_countBlocks = jQuery('div',orsl_block).length;	// Contamos items
		jQuery('div:last-child',orsl_block).clone().prependTo(orsl_block); // clonamos el último y lo ponemos el primero
		jQuery('div:eq(0)',orsl_block).attr('rel', '0');
		orsl_block.scrollLeft(orsl_blockWidth);
		jQuery('div:eq(1)', orsl_block).addClass('current');	// Al segundo (que es el 0 )
		
		if(orsl_timer > 0)
		{
			orsl_intervalList[orsl_index] = setInterval(function(){orsl_activeMove(orsl_speed,orsl_block, orsl_countBlocks, true);}, orsl_timer);
		}
	});
	
	jQuery('.or_slider_move > span').on('click', function(){
		var orsl_direccion = jQuery(this).hasClass('or_next') ? true : false;
		var orsl_moveDiv = jQuery(this).closest('.or_slider_move');
		var orsl_index = parseInt(orsl_moveDiv.attr('rel'));
		var orsl_block = jQuery('.or_slider_contentBlocks').eq(orsl_index);
		var orsl_countBlocks = jQuery('div',orsl_block).length - 1;
		var orsl_timer = parseInt(orsl_block.attr('rel-timer'));
		var orsl_speed = parseInt(orsl_block.attr('rel-speed'));
		orsl_activeMove(orsl_speed,orsl_block, orsl_countBlocks, orsl_direccion);
		if(orsl_timer > 0)
		{
			clearInterval(orsl_intervalList[orsl_index]);
			orsl_intervalList[orsl_index] = setInterval(function(){orsl_activeMove(orsl_speed,orsl_block, orsl_countBlocks, true);}, orsl_timer+orsl_speed);
		}
	});
  /*** -END- Mod Slider OR ***/
  /*** -START- Mod Galeria OR ***/
	jQuery('.or_gallery_image').on('click', function(){
		// Comprobamos si hay modal abierto
		if(!jQuery('body').hasClass('overflow-hiden'))
		{
			//var padre = jQuery(this).closest('.or_gallery_content');
			// comprobamos si tiene una etiqueta <a>			
			if(jQuery('a', this).length == 0)
			{
				var current = jQuery(this);
				var mini = jQuery('img', current);
				var altTxt = mini.attr('alt');
				var maxi = current.attr('rel-image');
				var modal = jQuery('.or_galleryModal');
				var xmlData = false;
				if(current.attr('rel-xmltitle') != "" && current.attr('rel-xmltitle') != undefined)
				{
					altTxt = current.attr('rel-xmltitle');
					xmlData = true;
				}
				jQuery('body').addClass('overflow-hiden');
				modal.addClass('show');
				modal.html("");
				modal.append('<div class="orGallery_close" onclick="orGallery_close(this);">X</div>');
				modal.append('<img class="orGallery_imgAmpli" src="'+maxi+'" alt="'+altTxt+'">');
				if(xmlData)
				{
					modal.append('<div class="orGallery_xmlContent">'+altTxt+'</div>');
					if(current.attr('rel-xmllink') != "")
					{
						modal.append('<div class="orGallery_xmlLink"><a href="'+current.attr('rel-xmllink')+'" target="_blank">'+current.attr('rel-xmllinktxt')+'</a></div>');
					}
				}
			}
			
		}		
	});
	jQuery('.orGallery_close').on('click', function(){ orGallery_close(this); });
  /*** -END- Mod Galeria OR ***/
  /**** CONTENT FLIP ****/
  jQuery('.or_cflip_btn').on('click', function(){ or_cflip(this); });
  /**** PHOTO CHANGE ****/
  jQuery('.or-photochange .pclist div').on('click', function(){
    var padre = jQuery(this).parent().parent();
    var target = jQuery('.pctarget img', padre);
    var currentSrc = jQuery('img', this).attr('src');
    var targetSrc = jQuery(target).attr('src');
    jQuery(target).attr('src', currentSrc);
    jQuery('img', this).attr('src', targetSrc);
  });
  /**** IMAGE EFFECT ****/
  jQuery('.orimg_effect').on('click', function(){ or_imgEffect(this); });
  jQuery('.orimg_effect').hover(function(){ if(!is_touch_device()){ or_imgEffect(this); } });
  /**** MODAL SCRIPT ****/
  jQuery(document).mouseup(function(e)  // Close
  {
      var container = jQuery(".or-fullCover.convertforms form");
      var modalCover = jQuery(".or-fullCover.convertforms");
      // if the target of the click isn't the container nor a descendant of the container
      if (modalCover.length > 0 && !container.is(e.target) && container.has(e.target).length === 0 ) 
      {
          //container.hide();
          modalCover.addClass('post-display');
          var padre = modalCover.parent();
          padre.removeClass('zindex10');
          setTimeout(function(){
            modalCover.removeClass('post-display');
            modalCover.removeClass('or-fullCover');
            jQuery('body').removeClass('overflow-hiden');
            jQuery('.or-bgFade').remove('');
          },500);
      }
  });
  jQuery('.ormodal ').on('click', function()  // Open
  {
    var clicked = jQuery(this);
    //var target = clicked.attr('rel');
    var targetId = (clicked.attr('rel') == undefined || clicked.attr('rel') == "") ? ".convertforms" : "."+clicked.attr('rel');
    if(!jQuery(targetId).hasClass('or-fullCover'))
    {
      jQuery(targetId).addClass('or-fullCover');
    }
    var padre = jQuery(targetId).parent();
    padre.addClass('zindex10');
    jQuery(targetId).addClass('none');
    if(jQuery('.or-close', targetId).length == 0)
    {
      jQuery(targetId).prepend('<div class="or-close" rel="'+targetId+'" onclick="return or_modalClose(\''+targetId+'\');"><span class=""><i class="oricon-close"></i></span></div>');
    }
    jQuery('body').append('<div class="or-bgFade"></div>');
    jQuery('body').addClass('overflow-hiden'); 
    jQuery(targetId).addClass('pre-display');
    jQuery(targetId).removeClass('none');
    setTimeout(function(){
      jQuery(targetId).removeClass('pre-display');
    },500);
       
  });
  
  /*** Mod Video PopUp OR ***/
  jQuery('.openVideoPopUp').on('click', function() { console.log('click'); orVideo_openPopUp(this); });
  /*** -END- Mod Video PopUp OR ***/
  /*** Mod PopUp OR ***/
  jQuery('.or_popup').each(function() {
    var orPop = jQuery(this);
    var orPop_desk = orPop.attr('rel-desk');
    var orPop_mobile = orPop.attr('rel-mob');
    var orPop_cookieName = orPop.attr('rel-cookie');
    var orPop_cookieValue = orPop.attr('rel-cookieval');
    if(!orPopup_checkCookie(orPop_cookieName, orPop_cookieValue) && (orPop_mobile == 1 || orPop_mobile == 0 && !checkMobileSize()) && ( (orPop_desk == 1 || orPop_desk == undefined) || orPop_desk == 0 && checkMobileSize()) )
    {
      var orPop_cookieTime = orPop.attr('rel-cookietime');
      var metodo = orPop.attr('mod-attr');
      var metodoValor = orPop.attr('mod-attrval');
      if(metodo == "time") // Time
      {
        setTimeout(function(){ orPopup_lanzar(orPop); orPopup_setCookie(orPop_cookieName, orPop_cookieValue, orPop_cookieTime); }, metodoValor);
      }
    }
  });
  jQuery( window ).scroll(function() 
  {
      jQuery('.or_popup').each(function() {
          var orPop = jQuery(this);
          var orPop_mobile = orPop.attr('rel-mob');
          var orPop_cookieName = orPop.attr('rel-cookie');
          var orPop_cookieValue = orPop.attr('rel-cookieval');
          if(!orPopup_checkCookie(orPop_cookieName, orPop_cookieValue) && (orPop_mobile == 1 || orPop_mobile == 0 && !checkMobileSize()) && ( (orPop_desk == 1 || orPop_desk == undefined) || orPop_desk == 0 && checkMobileSize()) )
          {
              var orPop_cookieTime = orPop.attr('rel-cookietime');
              var metodo = orPop.attr('mod-attr');
              var metodoValor = orPop.attr('mod-attrval');
              if(metodo != "time") //posicion
              {
                  var percent = metodoValor.includes("%");
                  var valor = parseInt(metodoValor);
                  lanzar = false;
                  if( (percent && (jQuery(window).scrollTop() >= (jQuery(document).height() - jQuery(document).height()*(valor*0.01)))) ||
                      (!percent && (jQuery(window).scrollTop() >= valor)) )
                  {
                      orPopup_lanzar(orPop);
                      orPopup_setCookie(orPop_cookieName, orPop_cookieValue, orPop_cookieTime);
                  }
              }	
          }
          
      });
  });
  /*** -END- Mod PopUp OR ***/
  /**** RESIZE ****/
  jQuery( window ).resize(function()
  {
    var mobilestatus = checkMobileSize();
    if(mobilestatus)
    {
      // ** Si es mobile comprobamos el contenido del cajetin
    }
    else
    {
      if(!jQuery('.or-fullsize').hasClass('none'))
      {
        be_closeBooking();
      }
      /** OR Content Flip **/
      or_cflip_reset();
    }
    
    /** OR Carrousel **/
    orCarrouselRestart();
    
  });
  
});

// Abrimos el menú de navegación menu
jQuery('.or-nav-menu.or-nav-burger').on('click', function(){
  or_tpl_deployItem('.or-nav-menu-display.mod-list',1);
});
// Cerramos menu
jQuery('.mod-list > .nav-close').on('click', function(){
  or_tpl_enrolItem('.or-nav-menu-display.mod-list.displayed',1);  
});

// Abrimos el menú de idioma
jQuery('.or-nav-menu.or-drop-langlist').on('click', function(){
  var status = jQuery('.or-nav-menu.or-drop-langlist').attr('rel-dep');
  if(status == 0)
  {
    or_tpl_deployItem('.or-nav-menu-display.or_menu_lang_list',0);
    jQuery('.or-nav-menu.or-drop-langlist').attr('rel-dep',1);
    status = 1;
  }else
  {
    or_tpl_enrolItem('.or-nav-menu-display.or_menu_lang_list',0);
    jQuery('.or-nav-menu.or-drop-langlist').attr('rel-dep',0);
    status = 0;
  }
  setTimeout(function(status){ jQuery('.or-nav-menu.or-drop-langlist').attr('rel-dep',status); },500);
});
// Cerramos el menú de idioma
/*jQuery('.or-nav-menu.or-droped-langlist').on('click', function(){
  or_tpl_enrolItem('.or-nav-menu-display.or_menu_lang_list',0);
  jQuery('.or-nav-menu.or-droped-langlist').addClass('or-drop-langlist');
  jQuery('.or-nav-menu.or-droped-langlist').removeClass('or-droped-langlist');
});*/

/*** Mod Pop Up OR ***/
if(typeof orPopup_setCookie === 'undefined' )
{    
    function orPopup_setCookie(cname, cvalue, exdays)
    {
        if(exdays > 0)
        {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";";
        }
        else
        {
            document.cookie = cname + "=" + cvalue + ";";
        }
    }
}
if(typeof orPopup_getCookie === 'undefined' )
{  
    function orPopup_getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
if(typeof orPopup_checkCookie === 'undefined' )
{  
    function orPopup_checkCookie(cname, valor)
    {
        var salida = false;
        if(orPopup_getCookie(cname) == valor){ salida = true; }
        return salida;
    }
}
if(typeof orPopup_lanzar === 'undefined' )
{  
    function orPopup_lanzar(target)
    {
        jQuery('.body').addClass('overflow-hiden');
		jQuery(target).addClass('or-fullCover');
    }
}    
if(typeof orPopupClose === 'undefined' ) { function orPopupClose(e) { be_closeCover(e); } }
/*** -END- Mod Pop Up OR ***/
/*** Mod Video Pop Up OR ***/
if(typeof orVideo_openPopUp === 'undefined' )
{
 function orVideo_openPopUp(e)
 {
   var b=jQuery(e).hasClass('or_video_popup');
   var o=jQuery(e);
   if(!b){o=o.closest('.or_video_popup');}
   var params = o.attr('rel-params');
   var mp4_file = o.attr('rel-mp4');
   var ogg_file = o.attr('rel-ogg');
   var webm_file = o.attr('rel-webm');
   var video_id = o.attr('id');
   
   var body = jQuery('body');
   var modalItem = '<div id="orVideoPopUp" class="or-fullCover">';
   
   modalItem += '<div class="or-modal-container">';
     modalItem += '<div class="or-modal-header"><div class="or-close" rel="#orVideoPopUp" onclick="return orVideoRemove(\'#orVideoPopUp\');"><span class=""><i class="oricon-close"></i></span></div></div>';
     modalItem += '<div class="or-modal-body">';

     modalItem += '<video id="modal_'+video_id+'" class="or_video_tag" '+params+' preload="metadata" playsinline>';
      modalItem += '<source src="'+mp4_file+'" type="video/mp4" codecs="avc1.42E01E, mp4a.40.2">';
      modalItem += '<source src="'+ogg_file+'" type="video/ogg" codecs="theora, vorbis">';
      modalItem += '<source src="'+webm_file+'" type="video/webm" codecs="vp8, vorbis">';
      modalItem += 'HTML5 v&iacute;deo no es soportado por este navegador';
     modalItem += '</video>';
     
     modalItem += '</div>';
     modalItem += '<div class="or-modal-footer"></div>';
   modalItem += '</div>';
   
   modalItem += '</div>';
   body.addClass('overflow-hiden');
   body.append(modalItem);
   
 }
}
if(typeof orVideoRemove === 'undefined' ) { function orVideoRemove(e) { be_closeCover(e); jQuery(e).remove(); } }
/*** Mod Galeria OR ***/
function orGallery_close(e)
{
	if(jQuery('.or_galleryModal').hasClass('show'))
	{
		var padre = jQuery(e).closest('.or_galleryModal');
		padre.removeClass('show');
		jQuery('body').removeClass('overflow-hiden');
		padre.html('');
	}
}
/*** -END- Mod Galeria OR ***/
/*** Mod Slider OR ***/

function orsl_activeMove(speed,bloque, max_block, direccion)
{
	if(!bloque.hasClass('moving'))
	{
		var blockWidth = bloque.width();
		var actual = jQuery('.current', bloque);
		var actualrel = parseInt(actual.attr('rel'));
		var newrel;
		bloque.addClass('moving'); // Anulamos cualquier acción futura sobre este bloque hasta que termine la transición
		actual.addClass('movenext'); // Anulamos cualquier acción futura sobre este bloque hasta que termine la transición
		// Si la direción es positiva...
		if(direccion)
		{
			if(actualrel >= max_block) { bloque.scrollLeft(0); actualrel = 0; }		
			newrel = actualrel+1;
		}
		else // si la dirección es negativa....
		{
			if(actualrel == 0) { bloque.scrollLeft(blockWidth*max_block); actualrel = max_block; }	// si estamos en el clon
			newrel = actualrel-1;
		}
		bloque.animate({scrollLeft: (newrel)*blockWidth}, speed);
		actual.removeClass('movenext');
		actual.removeClass('current');
		
		jQuery('[rel='+newrel+']', bloque).addClass('current');
		setTimeout(function(){ jQuery('.or_slider_contentBlocks.moving').removeClass('moving'); }, speed);
	}	
}
/*** -END- Mod Slider OR ***/
/*** OR_CUSTOM CARROUSEL ***/

function or_customCarrouselAction(actual, tipo)
{	
	var contenedor = actual.closest('.or_customCarrouselContent');
	var ampliacion = jQuery('.or_customCarrouselPhoto', contenedor);
	switch(tipo)
	{
		case 1:
			if(!actual.hasClass('selected') && !ampliacion.hasClass('moving'))
			{
				ampliacion.addClass('moving');
				jQuery('.or_customCarrouselPhotoList > div', contenedor).removeClass('selected');
				actual.addClass('selected');
				or_customCarrouselChangePhoto(actual, ampliacion);
			}
			break;
		case 2:
			if(!ampliacion.hasClass('moving'))
			{
				ampliacion.addClass('moving');
				var cRelNum = parseInt(jQuery('div', ampliacion).attr('rel'));	// Actual activo
				var tNums = jQuery('.or_customCarrouselPhotoList > div', contenedor).length;	// Total
				var reverse = actual.hasClass('or_prev') ? true : false; //'toKillprev' : 'toKill';
				var nextRel = cRelNum + 1;
				if(reverse){ nextRel = cRelNum - 1; }
				
				if(nextRel > tNums) { nextRel = 1; }
				if(nextRel < 1) { nextRel = tNums; }
				var newItem = jQuery('.or_customCarrouselPhotoList > div[rel='+nextRel+']', contenedor);
				jQuery('.or_customCarrouselPhotoList > div', contenedor).removeClass('selected');
				newItem.addClass('selected');
				
				var toKill = jQuery('div', ampliacion);
				or_customCarrouselChangeAction(newItem, ampliacion, toKill, reverse);
			}
			break;
	}
}
function or_customCarrouselChangeAction(actual, ampliacion, toKill, reverse)
{
	var photoList = actual.closest('.or_customCarrouselPhotoList');
  var desplazamiento = actual.width()*(actual.attr('rel')-1);
  // *** TEST
  if(desplazamiento != 0){ desplazamiento = desplazamiento - (actual.width()/2);  }
  // *** FIN TEST
	photoList.animate({scrollLeft: desplazamiento}, 500);
	
	var resetAll;
	if(!reverse){
		ampliacion.append('<div rel="'+actual.attr('rel')+'">'+actual.html()+'</div>');
		toKill.addClass('toKill');
	}else{
		ampliacion.addClass('rk');
		ampliacion.prepend('<div rel="'+actual.attr('rel')+'">'+actual.html()+'</div>');
		toKill.addClass('toKillprev');
	}
	resetAll = setTimeout(function(){toKill.remove(); ampliacion.removeClass('moving'); ampliacion.removeClass('rk');}, 1000);	
}
function or_customCarrouselChangePhoto(actual, ampliacion)
{
	var relnum = actual.attr('rel');
	var toKill = jQuery('div', ampliacion);
	var reverse = toKill.attr('rel') > relnum ? true : false; 
	or_customCarrouselChangeAction(actual, ampliacion, toKill, reverse);
}
/*** -END- OR_CUSTOM CARROUSEL ***/

function resizeHeader()
{
	var header_div;
	var style_div = false;
	var content;
	if(jQuery('.header_resize').length > 0)	{ header_div = jQuery('.header_resize'); }
	if(jQuery('style#header_resize').length > 0){ style_div = true; }
	var height = jQuery( window ).height();
	content = '.header_resize { height: '+height+'px !important; width: 100%; padding-bottom:0; }';
	if(checkMobileSize())
	{
		var width = jQuery( window ).width();
		if(width > height)
		{
			content = '.header_resize { heigth: '+width+'px !important; width: 100%; padding-bottom:0; }';
		}
	}
	if(header_div != undefined)
    {
      if(style_div){ jQuery('style#header_resize').html(content); }
      else{ jQuery('body').append('<style id="header_resize">'+content+'</style>'); }
    }
}

function or_cflip(e)
{
  var parent = jQuery(e).closest('.or_cflip');
  if(!parent.hasClass('activo'))   // si no estamos mostrando lo oculto calculamos la altura para darle "valor"
  {
    var altura = jQuery('.or_cflip_current', parent).height();
    parent.css('height', altura);
    if(checkTableSize()) { jQuery("html, body").animate({ scrollTop: parent.offset().top }, 1000); }
  }
  parent.toggleClass('activo');
}
function or_cflip_reset()
{
  jQuery('.or_cflip').removeClass('activo');
}

function or_tpl_enrolItem(t,b) // t: Target (str) |b: Body affect (int)
{
  jQuery(t).addClass('hide');
  setTimeout(function(){
    jQuery(t).removeClass('hide');
    jQuery(t).removeClass('displayed');
    if(b == 1) { jQuery('body').removeClass('overflow-hiden'); }
  },500);
}

function or_tpl_deployItem(t,b) // t: Target (str) |b: Body affect (int)
{
  if(b == 1) { jQuery('body').addClass('overflow-hiden'); }
  jQuery(t).removeClass('hide');
  jQuery(t).addClass('show');
  setTimeout(function(){
    jQuery(t).addClass('displayed');
    jQuery(t).removeClass('show');
  },500);
}

var or_home_height = undefined;
/** SCROLLING SCRIPTS **/
jQuery(window).on('scroll', function () {
  /* Movimiento del menu */
  if(jQuery(window).scrollTop() >= jQuery('.or-nav-container').height())  // Deberia estar "flotando"
  {
    if(!jQuery('.or-nav-container').hasClass('or-float')) // Si no tiene la clase flotante aun se la ponemos
    {
      jQuery('body').addClass('or-float');  // Indicamos al body que tiene el menú "flotando"
      jQuery('.or-nav-container').addClass('or-float'); // Indicamos al menu que empiece a flotar.
      // Peculiaridades "mobile"
      if(checkMobileSize()) // Si es mobile
      {
        // Quitamos el display none del boton de Booking (si lo tiene)
        jQuery('.or-nav-menu.or-nav-booking').removeClass('none');
        jQuery('.buscador.or_behome').addClass('none');
      }
    }
  }
  else  // Si no deberia flotar...
  {
    jQuery('.or-nav-container').removeClass('or-float');  // Eliminamos la clase que le hace flotar
    jQuery('body').removeClass('or-float'); // Indicamos al body que ya no flota el menu
    if(checkMobileSize) // Si es mobile
    {
        // Ocultamos el "contenedor" del menú asignado para incluir el botón de reservas.
       jQuery('.or-nav-menu.or-nav-booking').addClass('none');
        jQuery('.buscador.or_behome').removeClass('none');
    }
  }
  /* Movimiento del cajetin */
  if( jQuery('#buscador.or_behome .sticky-buscador form').length > 0 )  // Si el formulario no está vacio
  {
    // Obtenemos la altura del menu.
    
    if(or_home_height == undefined)
    {
      or_home_height = parseInt(jQuery("#buscador.or_behome .sticky-buscador").css('top'));
    }
    // Si hemos bajado por encima de la distancia al TOP del buscador
    if((jQuery(window).scrollTop() + jQuery('.or-nav-container').height()) >= or_home_height)  
    {
      if(!jQuery('#buscador.or_behome .sticky-buscador').hasClass('or-float'))
      {        
        jQuery('#buscador.or_behome .sticky-buscador').addClass('or-float');
      }
    }
    else{jQuery('#buscador.or_behome .sticky-buscador').removeClass('or-float');}
  }
  // Ventajas Exclusivas
  if( jQuery('.or-nav-menu.or-nav-extras').attr('rel') != "" )  //  Está activado el botón de ventajas exclusivas
  {
      // Obtenemos la clase identificativa del navegador Extra
      var clase =  jQuery('.or-nav-menu.or-nav-extras').attr('rel');
      // si la altura actual es igual a la altura del bloque con el contenido mostramos el botón
      if(jQuery(window).scrollTop() >= jQuery('.'+clase).offset().top + jQuery('.'+clase).height())
      {
          jQuery('.or-nav-menu.or-nav-extras').addClass('flex');
      }
      else
      {
          jQuery('.or-nav-menu.or-nav-extras').removeClass('flex');
      }
      
  }
});
/** Cabecera ScrollTo Top End **/
jQuery('.or_scrollTopEnd').on('click', function(){
  var topEnd = jQuery('.or-topend').offset().top - jQuery('.or-nav-container').height() + 1;
  jQuery('html,body').animate({
        scrollTop: topEnd
    }, 500);
});

/*** OR CARROUSEL FUNCTIONS ***/
function orCarrouselNext(i)
{
    
  var target = jQuery('.or-carrousel-target[rel='+i+']');
  var currentLeft = parseInt(jQuery('.or-carrousel-target-img', target).css('left'));  // Obtenemos el left actual
  var count = jQuery('.or-carrousel-target-img', target).length - 2;  // Contamos las imágenes (menos una que es la duplicada)
  var contenedor_w = jQuery('.or-carrousel-target-img', target).width();  // Obtenemos el ancho 
  orCarrouselBtnState(target, 'active', 'unactive'); // Deshabilitamos los botones: pasamos de active a unactive
  // Creamos la animación
  // si el left actual = o menor a el ancho de la caja sgnifica que estamos la primera imagen
  if( currentLeft <= 0 - (contenedor_w * (count+1) ) )
  {
    jQuery('.or-carrousel-target-img', target).css("left", 0 - (contenedor_w));
  }
  // Comprobamos si está bien colocado
  else if(Math.round(currentLeft / contenedor_w) * contenedor_w != currentLeft)
  {
    jQuery('.or-carrousel-target-img', target).css("left", (Math.round(currentLeft / contenedor_w) * contenedor_w) );
  }
  currentLeft = parseInt(jQuery('.or-carrousel-target-img', target).css('left'));
  jQuery('.or-carrousel-target-img', target).animate({"left": (currentLeft - contenedor_w)}, 500);
  
  setTimeout(function(){orCarrouselBtnState(target, 'unactive', 'active');},500);
  
}

function orCarrouselPrev(i)
{
  var target = jQuery('.or-carrousel-target[rel='+i+']');
  var currentLeft = parseInt(jQuery('.or-carrousel-target-img', target).css('left'));  // Obtenemos el left actual
  var count = jQuery('.or-carrousel-target-img', target).length - 2;  // Contamos las imágenes (menos una que es la duplicada)
  var contenedor_w = jQuery('.or-carrousel-target-img', target).width();  // Obtenemos el ancho 
  orCarrouselBtnState(target, 'active', 'unactive'); // Deshabilitamos los botones: pasamos de active a unactive
  // Creamos la animación
  // si el left actual = o mayor a 0 - el ancho de la caja sgnifica que estamos la primera imagen
  if( currentLeft >= (0 - contenedor_w) )
  {
    jQuery('.or-carrousel-target-img', target).css("left", 0 - (contenedor_w * (count+1) ));
  }
  // Comprobamos si está bien colocado
  else if(Math.round(currentLeft / contenedor_w) * contenedor_w != currentLeft)
  {
    jQuery('.or-carrousel-target-img', target).css("left", 0 - (Math.round(currentLeft / contenedor_w) * contenedor_w));
  }
  currentLeft = parseInt(jQuery('.or-carrousel-target-img', target).css('left'));
  jQuery('.or-carrousel-target-img', target).animate({"left": (currentLeft + contenedor_w)}, 500);
  
  setTimeout(function(){orCarrouselBtnState(target, 'unactive', 'active');},500);
  
}

function orCarrouselBtnState(i, clin, clout)  // Habilitamos botones: pasamos de unactive a active
{
  if(jQuery('.or-carrousel-target-controller.'+clin, i).length > 0)
  {
    var t = jQuery('.or-carrousel-target-controller.'+clin, i);
    t.addClass(clout);
    t.removeClass(clin);
  }
}

function orCarrouselDimensiones(pointer)
{
  jQuery(pointer).css('height', "");
  jQuery('.or-carrousel-target-img', pointer).css('width', "");
  var image = new Image();
  image.src = jQuery('.or-carrousel-target-img:first-child img', pointer).attr("src");
  var imgWidth = image.naturalWidth;
  var imgHeight = image.naturalHeight;
  var imgRatio = parseFloat(imgWidth / imgHeight);
  var contenedor_w = jQuery(pointer).width();
  jQuery(pointer).css('height',parseInt(contenedor_w/imgRatio)+"px");
  contenedor_w = jQuery(pointer).width();
  jQuery('.or-carrousel-target-img', pointer).css('width', contenedor_w); // Asignamos a las imágenes el ancho del cajón.
  
  var contenedor_h = jQuery(pointer).height();
  // Comprobamos si el alto de la imagen es más pequeño que el del cajón. Si lo es modificamos el alto y el ancho lo dejamos automático...
  if(jQuery('.or-carrousel-target-img > img', pointer).height() < contenedor_h)
  {
      jQuery('.or-carrousel-target-img > img', pointer).css('width', 'auto'); // Asignamos a las imágenes el ancho del cajón.
      jQuery('.or-carrousel-target-img > img', pointer).css('max-width', 'auto'); // Asignamos a las imágenes el ancho máximo del cajón.
      jQuery('.or-carrousel-target-img > img', pointer).css('height', contenedor_h+'px'); // Asignamos a las imágenes el ancho del cajón.
      jQuery('.or-carrousel-target-img', pointer).css('overflow-x', 'hidden'); // Asignamos a las imágenes el ancho del cajón.
  }
  jQuery('.or-carrousel-target-img', pointer).css('left', contenedor_w*(-1));
}

function orCarrouselSetValues(i, pointer)
{
  jQuery(pointer).attr('rel', i);
  var primero = jQuery('.or-carrousel-target-img:first-child', pointer).clone();
  var ultimo = jQuery('.or-carrousel-target-img:last-child', pointer).clone();
    
  primero.appendTo( pointer );
  ultimo.prependTo( pointer );
  
  orCarrouselDimensiones(pointer);
}


function orCarrouselDeploy(e)
{
  // Seleccionamos el contenedor padre para poder apuntar al or-deploy
  var current = jQuery(e);
  var padre = jQuery(e).parent();
  if(jQuery('.or-deploy', padre).hasClass('deployed'))
  { jQuery('.or-deploy', padre).removeClass('deployed');  }
  else
  { jQuery('.or-deploy', padre).addClass('deployed'); }
  
  if(jQuery('span', current).hasClass('active')){ jQuery('span.active', current).addClass('current'); }
  
  jQuery('span', current).addClass('active');
  jQuery('span.current', current).removeClass('active');
  jQuery('span.current',current).removeClass('current');
  
}

/*** FUNCTION OR IMAGE EFFECT ***/
var or_imgEffectTimeout;
function or_imgEffect(e)
{
  var target = jQuery(e);
  var editar = target.hasClass('hover');
  jQuery('.orimg_effect').removeClass('hoverOut');
  jQuery('.orimg_effect.hover').addClass('hoverOut');
  jQuery('.orimg_effect').removeClass('hover');
  if(!editar)
  {
    target.addClass('hover');
    target.removeClass('hoverOut');
  }
  if(or_imgEffectTimeout != null) { clearTimeout(or_imgEffectTimeout); }
  or_imgEffectTimeout = setTimeout(function(){ jQuery('.orimg_effect.hoverOut').removeClass('hoverOut'); },500);
}

/**** MODAL CLOSE ****/
function or_modalClose(tar)
{
  var modalCover = jQuery(tar);
  modalCover.addClass('post-display');
  setTimeout(function(){
    modalCover.removeClass('post-display');
    modalCover.removeClass('or-fullCover');
    jQuery('body').removeClass('overflow-hiden');
    jQuery('.or-bgFade').remove('');
  },500);
}
var orCarrouselList = [];
var orCarrouselIntervals = [];


function orCarrouselRestart()
{
  var orCarr = -1;
  var newInterval = [];
  jQuery('.or-carrousel-target').each(function(){
    var autoplay = jQuery(this).hasClass('stoped');
    orCarr++;
    orCarrouselList[orCarr] = jQuery(this);
    
    // Asignar valores
    //orCarrouselSetValues(orCarr, this);
    orCarrouselDimensiones(this);
    
    // Creamos el interval
    if(!autoplay)
    {
      clearInterval(orCarrouselIntervals[orCarr]);
      newInterval[orCarr] = setInterval(function(orCarr){ orCarrouselNext(orCarr); }, 5000);
    }
    
    var contenedor_w = jQuery(this).width();
    var contenedor_h = jQuery(this).height();
    jQuery('.or-carrousel-target-controller',this).css("width", contenedor_w+"px");
    jQuery('.or-carrousel-target-controller',this).css("height", contenedor_h+"px");
  });
  orCarrouselIntervals = newInterval;
}

/** MOBILE SCRIPTS **/
function checkMobileSize()
{
  var mobile = false;
  var ancho = jQuery(window).width();
  if(ancho < 768) { mobile = true; }
  return mobile;
}
function checkTableSize()
{
  var table = false;
  var ancho = jQuery(window).width();
  if(ancho < 992) { table = true; }
  return table;
}
function checkTabletSize()
{
  var tablet = false;
  var ancho = screen.width;
  if(ancho >= 768 && ancho < 990 ) { tablet = true; }
  return tablet;
}

function is_touch_device() {
    
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    
    var mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

function be_openBooking()
{
  var modalExists = jQuery('.or-fullsize').length;
  if(modalExists == 0)  // No existe fullSize
  {
    jQuery('body').append('<div class="or-fullsize none"></div>');
  }
  var modalContainer = jQuery('.or-fullsize');
  if( modalExists == 0)
  {
    //modalContainer.html('');
    modalContainer.append('<div class="or-modal-header"><div class="or-logo">'+jQuery('.or-nav-menu.or-nav-logo').html()+'</div><div class="or-close" onclick="return be_closeBooking();"><span class=""><i class="oricon-close"></i></span></div></div>');
    modalContainer.append('<div class="or-modal-body"><div class="sticky-buscador uk-sticky block" ></div></div>');
    modalContainer.append('<div class="or-modal-footer"></div>');
  }
  jQuery('.buscador .sticky-buscador').contents().appendTo('.or-modal-body .sticky-buscador.uk-sticky.block');
  modalContainer.addClass('pre-display');
  modalContainer.removeClass('none');
  jQuery('body').addClass('overflow-hiden');
  setTimeout(function(){
    modalContainer.removeClass('pre-display');
  },500);
}
// Boton de cerrar modal BE
jQuery('.or-fullsize .or-close').on('click', function(){
  jQuery('.or-fullsize .or-close').addClass('none');
  be_closeBooking();
});
function be_closeBooking()
{
  var modalContainer = jQuery('.or-fullsize');
  modalContainer.addClass('post-display');
  setTimeout(function(){
    modalContainer.removeClass('post-display');
    modalContainer.addClass('none');
    jQuery('.or-modal-body .sticky-buscador.uk-sticky.block').contents().appendTo('.buscador .sticky-buscador');
    jQuery('body').removeClass('overflow-hiden');
  },500);
}


/*** STANDAR MODAL ***/
function or_buildCover(id)
{
  var itemID = '#'+id;
  var modalExists = jQuery(itemID).length;
  if(modalExists == 0)  // No existe fullSize
  {
    jQuery('body').append('<div id="'+id+'" class="or-fullCover none"></div>');
  }
  var modalCover = jQuery(itemID);
  if( modalExists == 0)
  {
    //modalContainer.html('');
    var or_buildModal ;
    or_buildModal = '<div class="or-modal-container">'; // Contenedor
      or_buildModal += '<div class="or-modal-header">'; // Cabecera (Close button)
        or_buildModal += '<div class="or-close" rel="'+itemID+'" onclick="return be_closeCover(\''+itemID+'\');"><span class=""><i class="oricon-close"></i></span></div>';
      or_buildModal += '</div>';
      or_buildModal += '<div class="or-modal-body"></div>'; // Body (cuerpo del contenido)
      or_buildModal += '<div class="or-modal-footer"></div>'; // Footer (si se necesita)
    or_buildModal += '</div>';
    modalCover.append(or_buildModal);
  }
}

function ventanaVentajasExclusivas()
{
  var clase = jQuery('.or-nav-menu.or-nav-extras').attr('rel');
  or_buildCover('or-modalExtras');
  jQuery('body').append('<div class="or-bgFade"></div>');
  var modalCover = jQuery('#or-modalExtras');
  if(jQuery('#or-modalExtras .or-modal-body').html() == "")
  {  jQuery('#or-modalExtras .or-modal-body').append(jQuery('.'+clase).html()); }
  modalCover.addClass('pre-display');
  modalCover.removeClass('none');
  jQuery('body').addClass('overflow-hiden');
  setTimeout(function(){
    modalCover.removeClass('pre-display');
  },500);
}

/*** VENTAJAS EXCLUSIVAS ***/ //ventajas_exclusivas_mobile
jQuery('.or-nav-menu.or-nav-extras').on('click', function(){
  ventanaVentajasExclusivas();
});
jQuery('.ventajas_exclusivas_mobile .or_extra_container').on('click', function(){
  ventanaVentajasExclusivas();
});

function be_closeCover(id)
{
  var modalCover = jQuery(id);
  modalCover.addClass('post-display');
  setTimeout(function(){
    modalCover.removeClass('post-display');
    modalCover.addClass('none');
    jQuery('body').removeClass('overflow-hiden');
    jQuery('.or-bgFade').remove('');
  },500);
}

/*** 6- BE JS ***/

function be_checkAction()
{
  var codigoProm = jQuery('#b-voucher-input').val();
  var dateIn = jQuery('#day-ida-hidden').val();
  var dateOut = jQuery('#day-vuelta-hidden').val();
  var ocupacion = jQuery('#habitaciones .counter').html();
  var portal = jQuery('#hotel-sel').val();  //ID Portal
  var lang = pLang();
  var rooms = pRooms(ocupacion);
  //si todos los campos obligatorios no estan completos

  var empty_flds = 0;
  jQuery("#buscador_reserva .required").each(function() {
      if(!jQuery.trim(jQuery(this).val())) {
          empty_flds++;
      }    
  });

  if(empty_flds){
    UIkit.notification({
      message: be_search_text("error_1"),
      status: 'danger',
      pos: 'top-center',
      timeout: 5000
    });
    jQuery(this).focus();
    return false;
  } else {
    // 
    var url = 'https://'+subdominio+'.open-room.com/BookingEngine/Landing?Request.Action=nueva&Request.PortalCodeOPR='+portal+'&Request.Hotel='+hotel+'&Request.Language='+lang+'&Request.CheckinDate='+dateIn+'&Request.CheckoutDate='+dateOut+'&Request.Occupation='+rooms+'&Request.PromotionalCode='+codigoProm+'&adParams=1';
    //window.open(url);
    //console.log(jQuery('#buscador_reserva').attr('action'));
    jQuery('#buscador_reserva').attr('action',url);
    console.log(url);
    return true;
  } // required fields 
//});
}

//mis reservas 
//jQuery('.b-book').on('click', function(){
function be_b_book()
{
    var lang = pLang();
    if (portal != '') {
      var url = 'https://'+subdominio+'.open-room.com/BookingEntry/BookingEntry?&Request.Language='+lang+'&Request.PortalCodeOPR='+portal;
      jQuery('.b-book').attr('href',url);
      return true;
      //console.log(url);
    } else {
      UIkit.notification({
        message: be_search_text("1"),
        status: 'danger',
        pos: 'top-center',
        timeout: 5000
      });
      return false;
    }
}

function be_dame_hoy()
{
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	
	today = dd + '-' + mm + '-' + yyyy;
	return today;
}

function be_dame_end()
{
	var today = new Date(or_maxDate);
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	
	today = dd + '-' + mm + '-' + yyyy;
	return today;
}
// disabled dates 
var checkDates = function(date) {
  if(or_blockDate_total > 0)
  {
    var filterDatecount = 0;
    var formatted = date.format('DD-MM-YYYY');
    var dateArray = [];
    //var or_blockDate_in = [];
    //var or_blockDate_out = [];
    while(or_blockDate_total > filterDatecount)
    {
      var startDate = new Date(or_blockDate_in[filterDatecount]); 
      var endDate = new Date(or_blockDate_out[filterDatecount]);
      
      var currentDate = moment(startDate);
      var endDate = moment(endDate);
      while (currentDate <= endDate) {
        dateArray.push( moment(currentDate).format('DD-MM-YYYY') )
        currentDate = moment(currentDate).add(1, 'days');
      }
      filterDatecount = filterDatecount + 1;
    }
    return dateArray.indexOf(formatted) > -1;
  }else{ return ""; }
}
// rangepicker
jQuery(document).ready(function() {
  //console.log(or_blockDate_in);
  //console.log(or_blockDate_out);
  jQuery('#rangepicker').daterangepicker({
    "autoApply": true,
    "locale": {
        //"format": "ddd, DD MMM",
        "format": "DD-MM-YYYY",
        "separator": " - ",
        "weekLabel": "W",
        "daysOfWeek": [be_day_short(7), be_day_short(1), be_day_short(2), be_day_short(3), be_day_short(4), be_day_short(5), be_day_short(6)],
        "dayNames": [be_day_long(7), be_day_long(1), be_day_long(2), be_day_long(3), be_day_long(4), be_day_long(5), be_day_long(6)],
        "monthNames": [be_month_long(1), be_month_long(2), be_month_long(3), be_month_long(4), be_month_long(5), be_month_long(6), be_month_long(7), be_month_long(8), be_month_long(9), be_month_long(10), be_month_long(11), be_month_long(12)],
        "monthNamesShort": [be_month_short(1), be_month_short(2), be_month_short(3), be_month_short(4), be_month_short(5), be_month_short(6), be_month_short(7), be_month_short(8), be_month_short(9), be_month_short(10), be_month_short(11), be_month_short(12)],
        "firstDay": 1
    },
    "minDate": be_dame_hoy(),
    "maxDate": be_dame_end(),
    "opens": "center",
    "linkedCalendars": false,
    "isInvalidDate": checkDates
    
  }, function(start, end, label) {
    jQuery('#day-ida-hidden').val(start.format('DD-MM-YYYY'));
    jQuery('#day-vuelta-hidden').val(end.format('DD-MM-YYYY'));
    jQuery('#rangepicker_title').css('display', 'none');
    jQuery('#rangepicker').css('opacity', 1);
  });
});
// rangepicker

jQuery('#hotel-sel').on('change', function(){
  var hotel_sel_val = jQuery(this).find('option:selected').text();
  jQuery('.hotel-sel-con span').html(hotel_sel_val);
});

jQuery('#habitaciones .icon').on("click",  function() {
  var more = jQuery(this).hasClass( "more" );
  var less = jQuery(this).hasClass( "less" );
  var value;
  if(more){
    value = getMore('habitaciones');
  } else if (less) {
    value = getLess('habitaciones');
  }
  
  var number = parseInt(value) + 1;
  jQuery('.hab-value').html(value);
  jQuery('.b-more-beds').empty();

  for (var i = 1; i < number; i++) {
    jQuery('.b-more-beds').append(
      '<div uk-grid class="mt-0 uk-grid-collapse">' +
        '<span class="bmb-title uk-width-1-1">' + be_search_text("4_1") + ' ' + i.toString() + '</span>' +
        '<div class="uk-width-expand">' +
          '<span>' + be_search_text("4_2") + '</span>' +
          '<div class="counter-container" id="adultos_hab_'+value+'_' + i.toString() + '">' +
            '<i class="icon less"></i>' +
            '<div class="counter ac-item">2</div> ' +
            '<i class="icon more"></i>' +
          '</div>' +
        '</div>' +
        '<div class="uk-width-expand">' +
          '<span>' + be_search_text("4_3") + '</span>' +
          '<div class="counter-container kids-counter" data-ninos-sel="'+value+'_' + i.toString() + '" id="ninos_hab_'+value+'_' + i.toString() + '">' +
            '<i class="icon less"></i>' +
            '<div class="counter kc-item">0</div>' +
            '<i class="icon more"></i>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div uk-grid class="uk-grid-collapse">' +
        '<div class="uk-width-1-1 mt-0"><div class="bmb-kids-cont-'+value+'_' + i.toString() + ' bmb-kids-cont uk-grid-collapse" uk-grid></div></div>' +
      '</div>');
    }
});

jQuery(document).on('click','.kids-counter .icon', function(event) {
    var parent = jQuery(this).parent();
    var data_ninos_sel = parent.data('ninos-sel');
    var ninos_number = parent.find('.counter').html();

    jQuery('.bmb-kids-cont-' + data_ninos_sel).empty();
    for (var i = 0; i < ninos_number; i++) {
      jQuery('.bmb-kids-cont-' + data_ninos_sel).append(''+
        '<div class="uk-width-expand">' +
          '<span class="bmb-title">' + be_search_text("4_3_1") + ' '+ (i + 1) +'</span>' +
          '<select required="true" id="ninos_hab_' + data_ninos_sel + '_'+ (i + 1) + '_edad" class="uk-select">' +
            '<option value="0">0</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '<option value="6">6</option>' +
            '<option value="7">7</option>' +
            '<option value="8">8</option>' +
            '<option value="9">9</option>' +
            '<option value="10">10</option>' +
            '<option value="11">11</option>' +
            '<option value="12">12</option>' +
          '</select>' + 
        '</div>' +
      '');
    }
  });

function pLang(){
    var langHTML = jQuery('html').attr('lang').split('-');
    var lang = langHTML[0];
    var code;
        switch(lang){ 
          case 'es': code = "1"; break;
          case 'en': code = "2"; break;
          case 'de': code = "3"; break;
          case 'ca': code = "7"; break;
          case 'fr': code = "4"; break;
          case 'it': code = "6"; break;
          case 'ru': code = "2"; break;
          case 'pt': code = "8"; break;
        }
        return code;
}

function pRooms(value){
      var number = parseInt(value) + 1;
      var total = "";
      for (var i = 1; i < number; i++) {
        var adults = jQuery('#adultos_hab_'+value +'_'+ i.toString()+' .counter').html();
        var adults_num = parseInt(adults) + 1;
        var adults_e = "";
        
        for (var j = 1; j < adults_num; j++) {
          adults_e = adults_e + "30,";
        }
        adults_e = adults_e.slice(0, -1);

        var kids = jQuery('#ninos_hab_'+ value +'_'+ i.toString() +' .counter').html();
        var kids_num = parseInt(kids) + 1;
        var kids_e = "";
        for (var k = 1; k < kids_num; k++) {
          var kids_edad = jQuery('#ninos_hab_'+ value +'_'+ i.toString() +'_'+ k +'_edad').val();
          kids_e = kids_e + kids_edad + ",";
        }
        if(kids_e != ""){
          kids_e = ","+kids_e.slice(0, -1);
        } else {
          kids_e = kids_e.slice(0, -1);
        }
        total = total + adults_e + kids_e + ';';
      }
      return total;
}

function getOcuAdultos(val){
    var i = 0;
    var edad = 30;
    var total = "";
      for (i = 0; i < val; i++) {
           total += edad+',';
      }

      total=total.slice(0,-1);
      return total;
}


function getOcuNinos(val){
    var i = 0;
    var edad = 6;
    var total = "";

    if(val != 0 && val != ''){
        for (i = 0; i < val; i++) {
         total += ','+ edad;
        }
    }else{ total = ''; }

      return total;
}

//maxima combinacion posible entre ambos selects = 3 personas
function maxPassenger(valor, id_select){
   var num = (3 - parseInt(valor));
   for(var i = 0; i <= 3; i++) {
      if(i <= num){ 
          jQuery(id_select).children("option[value^=" +i+ "]").show();
        }else{ 
          jQuery(id_select).children("option[value^=" +i+ "]").hide(); 
        }
      }
}

/* sumar i restar pax */

jQuery("body").on("click",".b-more-beds .icon.more", function(){
      var counter_id = jQuery(this).parent().attr('id');
      getMore(counter_id);
});

// sumar un pax
function getMore(id){
      var counter = parseInt(jQuery("#"+id+" .counter").text());
      counter = parseInt(counter)+1;
        if(id.indexOf("adultos") >= 0){ //if adultos
          if(counter >= max_adul){
            counter = max_adul;
            jQuery('#'+id+' .icon.more').addClass('disabled');
          } else {
            jQuery('#'+id+' .icon.less').removeClass('disabled');
          }
        } else if(id.indexOf("ninos") >= 0){ //if kids
          if(counter >= max_kids){
            counter = max_kids;
            jQuery('#'+id+' .icon.more').addClass('disabled');
          } else {
            jQuery('#'+id+' .icon.less').removeClass('disabled');
          }
        } else if(id.indexOf("habitaciones") >= 0){ //if hab
          if(counter >= max_hab){
            counter = max_hab;
            jQuery('#'+id+' .icon.more').addClass('disabled');
          } else {
            jQuery('#'+id+' .icon.less').removeClass('disabled');
          }
        }
      jQuery("#"+id+" .counter").text(counter);
      return counter;
}

jQuery("body").on("click",".b-more-beds .icon.less", function(){
      var counter_id = jQuery(this).parent().attr('id');
      getLess(counter_id);
});

// restar un pax
function getLess(id){
      var counter = parseInt(jQuery("#"+id+" .counter").text());
      counter = parseInt(counter)-1;
        if(id.indexOf("adultos") >= 0){ //if adultos
          if(counter <= min_adul){
            counter = min_adul;
            jQuery('#'+id+' .icon.less').addClass('disabled');
          } else {
            jQuery('#'+id+' .icon.more').removeClass('disabled');
          }
        } else if(id.indexOf("ninos") >= 0){ //if kids
          if(counter <= min_kids){
            counter = min_kids;
            jQuery('#'+id+' .icon.less').addClass('disabled');
          } else {
            jQuery('#'+id+' .icon.more').removeClass('disabled');
          }
        } else if(id.indexOf("habitaciones") >= 0){ //if hab
          if(counter <= min_hab){
            counter = min_hab;
            jQuery('#'+id+' .icon.less').addClass('disabled');
          } else {
            jQuery('#'+id+' .icon.more').removeClass('disabled');
          }
        }
      jQuery("#"+id+" .counter").text(counter);
      return counter;
}

// combo info occupancy
UIkit.util.on('.b-beds', 'beforehide', function () {
      var number_ac_items = 0;
      var number_kc_items = 0;
      jQuery('.ac-item').each(function(index) {
          var number = jQuery(this).text();
          number_ac_items = parseInt(number_ac_items) + parseInt(number);
      });
      jQuery('.kc-item').each(function(index) {
          var number = jQuery(this).text();
          number_kc_items = parseInt(number_kc_items) + parseInt(number);
      });
      if(number_kc_items == 0){
        jQuery('.b-title.hab-num').html('<span class="ac-counter">'+number_ac_items+'</span> ' + be_search_text("4_2"));
      } else {
        jQuery('.b-title.hab-num').html('<span class="ac-counter">'+number_ac_items+'</span> ' + be_search_text("4_2")+', <span class="kc-counter">'+number_kc_items+'</span> ' + be_search_text("4_3"));
      }
});
/*
	jQuery(window).on('load', function () {
  jQuery('.preloader').slideUp();
  var svg_bottom = (jQuery('.svg-bottom').height()) - 1;
  var svg_top = (jQuery('.svg-top').height()) - 1;
  jQuery('.svg-bottom').css('bottom',"-" + svg_bottom + "px");
  jQuery('.svg-top').css('top',"-" + svg_top + "px");
 });
*/
	jQuery(window).on('resize', function () {
  var svg_bottom = (jQuery('.svg-bottom').height()) - 1;
  var svg_top = (jQuery('.svg-top').height()) - 1;
  jQuery('.svg-bottom').css('bottom',"-" + svg_bottom + "px");
  jQuery('.svg-top').css('top',"-" + svg_top + "px");
});


// desactivar botó dret
//document.addEventListener('contextmenu', event => event.preventDefault());

// detect IE
var IEversion = detectIE();

if (IEversion !== false) {
  jQuery(window).on('load', function() {
    jQuery(".overlayed").append("<div class='overlay'></div>");
  });
}

function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

/* Cookies */

jQuery(document).ready(function() {

  var strCookieName = "cookie-compliance";
  var strApprovedVal = "approved";

  var cookieVal = readCookie(strCookieName);
  var $displayMsg = jQuery('#cookieMessageWrapper');

  if (cookieVal != strApprovedVal) {
    setTimeout(function() { $displayMsg.slideDown(200); }, 200);
  } else if (!$displayMsg.is(':hidden')) {
    $displayMsg.slideUp();
  }

  jQuery('#cookieClose').click(function() {
    $displayMsg.slideUp();
    createCookie(strCookieName, strApprovedVal, 365);
  });
});

//Cookie functions
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

/** COOKIES PLUGIN **/
// ************************ COOKIES JAVASCRPT CODE HERE (START HERE)***************************
// **************** Function to check cookie value - Start *****************
function check_cookie()
{
  if(document.getElementById("eu_cookies") != null)
  {
    if(getCookieforEU(getBaseURL()))
    { document.getElementById("eu_cookies").style.display="none"; }
    else
    { document.getElementById("eu_cookies").style.display="block"; }
  }
}


function getCookieforEU(eu_cookie_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  
if (x==eu_cookie_name)
    {
    return unescape(y);
    }
  }
}
// **************** Function to check cookie value - End *****************

// **************** Function to assign cookie value - Start *****************

// NOTE:- Cookie will expires in 30 days.
function calltohide()
{
	var exdate=new Date();
	eu_cookie_name=getBaseURL();
	value=randomString();
	exdays=30; 	
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	//document.cookie=eu_cookie_name + "=" + c_value;
	document.cookie=eu_cookie_name + "=" + c_value +";	path=/";
	document.getElementById("eu_cookies").style.display="none";
}
// **************** Function to assign cookie value - End *****************

// **************** Function to get base url for site to assign cookie - Start *****************
function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));

	if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
         url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return baseLocalUrl + "/";
    }
    else {
        // Root Url for domain name
        return baseURL + "/";
	}
}
// **************** Function to get base url for site to assign cookie - End *****************

// **************** Function to get generate random number - Start *****************
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 16;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

// **************** Function to get generate random number - End *****************
// ************************ COOKIES JAVASCRPT CODE HERE (END HERE)***************************

} else {
//var checkIEcompatible = document.getElementsByTagName('body')[0];
  document.body.innerHTML = newChild;
}