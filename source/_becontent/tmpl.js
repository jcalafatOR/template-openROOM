/*** 6- BE JS ***/

function be_checkAction()   // Comprobar form y enviar
{
    var form = document.getElementById('buscador_reserva');

    //var checkDispo = 0;
    var webApp = 0;
    var portal = jQuery('#hotel-sel').val();  //ID Portal


    var codigoProm = form.getElementById('b-voucher-input').value;
    var dateIn = form.getElementById('day-ida-hidden').value;
    var dateOut = form.getElementById('day-vuelta-hidden').value;
    var ocupacion = form.getElementById('habitaciones .counter').innerHTML;
  
    var lang = pLang();
    var rooms = pRooms(ocupacion);

    var isCadena = document.getElementsByName('frm_iscadena');
    if(isCadena == 1)
    {
        var hotelSelect = form.getElementById('hotel-sel');
        var hotelSelected = hotelSelect.selectedIndex;

        portal = hotelSelect.options[hotelSelected].getAttribute('data-portal');
        var portalId = hotelSelect.options[hotelSelected].getAttribute('data-id');
        //checkDispo = hotelSelect.options[hotelSelected].getAttribute('data-checkdispo');
        webApp = hotelSelect.options[hotelSelected].getAttribute('data-app');

        if(portalId > 0)
        {
            hotel = portalId;
        }
  
    }
    if(hotel == 0){ hotel = ''; }
   
  //si todos los campos obligatorios no estan completos

    var empty_flds = 0;
    const requierds = document.querySelectorAll("#buscador_reserva .required");

    requierds.forEach(function(e) {
        if(!trim(e.value))
        {
            empty_flds++;
        }
    });

/*
  jQuery("#buscador_reserva .required").each(function() {
      if(!jQuery.trim(jQuery(this).val())) {
          empty_flds++;
      }    
  });*/

    if(empty_flds){
        UIkit.notification({
            message: be_search_text("error_1"),
            status: 'danger',
            pos: 'top-center',
            timeout: 5000
        });
        form.focus();
        //jQuery(this).focus();
        return false;
    } else {
        // 
        let url;
        if(webApp > 0 && checkMobileSize() && hotel != '' && hotel > 0)
        {
          var buildUrl = 'https://mobilebooking.open-room.com/rooms.php?';
          //count_adults%5B%5D=3&count_childs%5B%5D=1&ch_age%5B5D=5&count_adults%5B%5D=1&count_childs%5B%5D=2&ch_age%5B%5D=8&ch_age%5B%5D=7&PVPpromo=
          buildUrl = buildUrl + 'start='+dateIn+'&';
          buildUrl = buildUrl + 'end='+dateOut+'&';
          buildUrl = buildUrl + 'hotelrooms='+hotel+'&';
          buildUrl = buildUrl + 'webportal_code='+portal+'&';
          buildUrl = buildUrl + 'agency_code=1920&';
          buildUrl = buildUrl + 'register_vars%5Bcode_lang%5D='+lang+'&';
          var roomsList = pRoomsWebApp(form);
          // for each
          for (let rlist = 0; rlist < roomsList.length; rlist++) {
            const element = roomsList[rlist];
            buildUrl = buildUrl + 'count_adults%5B%5D='+element[0]+'&';
            buildUrl = buildUrl + 'count_childs%5B%5D='+element[1]+'&';
            const kids = element[2];
            for (let klist = 0; klist < kids.length; klist++) {
              const elementKids = kids[klist];
              buildUrl = buildUrl + 'ch_age%5B%5D='+elementKids+'&';
            }
          }
          // end for
          buildUrl = buildUrl + 'PVPpromo='+codigoProm;
          
          //url = "https://mobilebooking.open-room.com/intro.php?hotel_code="+hotel+"&webportal_code="+portal+"&code_lang="+lang;
          url = buildUrl;

        }else{
          url = 'https://'+subdominio+'.open-room.com/BookingEngine/Landing?Request.Action=nueva&Request.PortalCodeOPR='+portal+'&Request.Hotel='+hotel+'&Request.Language='+lang+'&Request.CheckinDate='+dateIn+'&Request.CheckoutDate='+dateOut+'&Request.Occupation='+rooms+'&Request.PromotionalCode='+codigoProm+'&adParams=1';
        }

        if(checkDispo > 0)
        {
          var urlCheckDispo = 'https://bookings.open-room.com/GetAvailability/Availability?lang=1&portal='+portal+'&hotel='+hotel+'&valuePromoCode='+codigoProm+'&checkin='+dateIn+'&stay='+dateStay+'&occupation='+rooms;

          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              form.setAttribute('action', url);
              console.log(url);
              return true;
            }else
            {
              return msgNoDispo(form);
            }
          };
          xhttp.open("POST", urlCheckDispo, true);
          xhttp.send();
        }
        else
        {
          form.setAttribute('action', url);
          console.log(url);
          return true;
        }

    } // required fields 
//});
}
function msgNoDispo(form)
{
  const popUpDiv = document.getElementById('noDispoPopUp');
  const popUpDivContent = popUpDiv.getElementsByClassName('ormodal-content')[0];
  popUpDiv.classList.remove('none');
  popUpDivContent.classList.add('scale-in-center');

  const defusePU = setTimeout( () => {
    if(NoDispoRedirect > 0) // hay que redirigir
    {

      var codigoProm = form.getElementById('b-voucher-input').value;
      var dateIn = form.getElementById('day-ida-hidden').value;
      var dateOut = form.getElementById('day-vuelta-hidden').value;
      var ocupacion = form.getElementById('habitaciones .counter').innerHTML;
    
      var lang = pLang();
      var rooms = pRooms(ocupacion);

      hotelSelect = form.getElementById('hotel-sel');

      var portal = hotelSelect.options[0].getAttribute('data-portal');
      var hotel = hotelSelect.options[0].getAttribute('data-id');
      if(hotel == 0){ hotel = ''; }
      const newUrl = 'https://'+subdominio+'.open-room.com/BookingEngine/Landing?Request.Action=nueva&'+
            'Request.PortalCodeOPR='+portal+
            '&Request.Hotel='+hotel+
            '&Request.Language='+lang+
            '&Request.CheckinDate='+dateIn+
            '&Request.CheckoutDate='+dateOut+
            '&Request.Occupation='+rooms+
            '&Request.PromotionalCode='+codigoProm+'&adParams=1';

      form.setAttribute('action', newUrl);
    }
    popUpDivContent.classList.remove('scale-in-center');
    setTimeout(popUpDiv.classList.add('none'), 500);

  }, 5000);
  console.log("No hay disponibilidad");

  return false;
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
var checkDates = function (date) {

  const selectorDeHoteles1 = document.getElementById('hotel-sel');
  if(Object.keys(beMultiData[selectorDeHoteles1.selectedIndex]).length > 0)
  {
    var today = new Date();
    var yyyy = today.getFullYear();

    var currentDateFilter = beMultiData[selectorDeHoteles1.selectedIndex];
    or_blockDate_total = Object.keys(currentDateFilter).length + 1;
    
    or_blockDate_in = [];
    or_blockDate_out = [];
    for (let o = 0; o < 2; o++) {
      yyyy = parseInt(yyyy) + o;
      for (let i = 0; i < Object.keys(currentDateFilter).length; i++) {
        var element = currentDateFilter[i];
        
        var inDate = yyyy + '-' + element.in;
        var outDate = element.out;
        var nextYear = outDate.split('-');
        
        if(nextYear.length > 2)
        {
          nextYear[0] = yyyy + 1;
          outDate = nextYear.join('-'); 
        }
        else
        {
          outDate = yyyy + '-' + outDate;
        }
        or_blockDate_in.push(inDate);
        or_blockDate_out.push(outDate);
      }
    }
  }
  console.log(or_blockDate_in);
  if(or_blockDate_total > 0)
  {
    //var date = new Date();
    var filterDatecount = 0;
    var formatted = moment(date).format('DD-MM-YYYY');
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
    //console.log(dateArray);
    return dateArray.indexOf(formatted) > -1 ;
  }else{ return ""; }
}

// rangepicker
if(typeof UIkit !== "undefined")
{
  jQuery(document).ready(function() {
    //console.log(or_blockDate_in);
    //console.log(or_blockDate_out);
    ajustarRangepicker()
  });
}

function ajustarRangepicker()
{
  console.log(checkDates());
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

}
// rangepicker
/* Trasladado al on DOM ready
const selectorDeHoteles = document.getElementById('hotel-sel');
if (selectorDeHoteles != undefined) {
  selectorDeHoteles.addEventListener('change', (event) => {
    document.querySelector('.hotel-sel-con span').innerHTML = event.options[element.selectedIndex].innerHTML;
    ajustarRangepicker();
  });
}*/
/*jQuery('#hotel-sel').on('change', function(){
  var hotel_sel_val = jQuery(this).find('option:selected').text();
  jQuery('.hotel-sel-con span').html(hotel_sel_val);
});*/

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

  var kidsValue = 5;
  var form = document.getElementById('buscador_reserva');
  var isCadena = document.getElementsByName('frm_iscadena');
  var kidsDisplay = '';
  if(isCadena == 1)
  {
      var hotelFormSelect = form.getElementById('hotel-sel');
      var hotelSelected = hotelFormSelect.selectedIndex;
      kidsValue = hotelFormSelect.options[hotelSelected].getAttribute('data-kids');
      var adultsOnly = hotelFormSelect.options[hotelSelected].getAttribute('data-adult');

      if(adultsOnly == 1){ kidsDisplay = ' none ';}
  }

  for (var i = 1; i < number; i++) {

    var appendData = '<div uk-grid class="mt-0 uk-grid-collapse">' +
      '<span class="bmb-title uk-width-1-1">' + be_search_text("4_1") + ' ' + i.toString() + '</span>' +
      '<div class="uk-width-expand">' +
        '<span>' + be_search_text("4_2") + '</span>' +
        '<div class="counter-container" id="adultos_hab_'+value+'_' + i.toString() + '">' +
          '<i class="icon less"></i>' +
          '<div class="counter ac-item">2</div> ' +
          '<i class="icon more"></i>' +
        '</div>' +
      '</div>' +
      '<div class="uk-width-expand'+kidsDisplay+'">' +
        '<span>' + be_search_text("4_3") + '</span>' +
        '<div class="counter-container kids-counter" data-ninos-sel="'+value+'_' + i.toString() + '" id="ninos_hab_'+value+'_' + i.toString() + '">' +
          '<i class="icon less"></i>' +
          '<div class="counter kc-item">'+kidsValue+'</div>' +
          '<i class="icon more"></i>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div uk-grid class="uk-grid-collapse">' +
      '<div class="uk-width-1-1 mt-0"><div class="bmb-kids-cont-'+value+'_' + i.toString() + ' bmb-kids-cont uk-grid-collapse" uk-grid></div></div>' +
    '</div>';
    jQuery('.b-more-beds').append(appendData);
  }
});

jQuery(document).on('click','.kids-counter .icon', function(event) {
    var parent = jQuery(this).parent();
    var data_ninos_sel = parent.data('ninos-sel');
    var ninos_number = parent.find('.counter').html();

    const hotelSelect = ['','','','','','','','','','','','',''];

    var form = document.getElementById('buscador_reserva');
    var isCadena = document.getElementsByName('frm_iscadena');
    if(isCadena == 1)
    {
        var hotelFormSelect = form.getElementById('hotel-sel');
        var hotelSelected = hotelFormSelect.selectedIndex;
        var kidsAge = hotelFormSelect.options[hotelSelected].getAttribute('data-kids');
        hotelSelect[kidsAge] = " selected ";
    }else{
      hotelSelect[5] = " selected ";
    }


    jQuery('.bmb-kids-cont-' + data_ninos_sel).empty();
    for (var i = 0; i < ninos_number; i++) {
      jQuery('.bmb-kids-cont-' + data_ninos_sel).append(''+
        '<div class="uk-width-expand">' +
          '<span class="bmb-title">' + be_search_text("4_3_1") + ' '+ (i + 1) +'</span>' +
          '<select required="true" id="ninos_hab_' + data_ninos_sel + '_'+ (i + 1) + '_edad" class="uk-select">' +
            '<option value="0"'+hotelSelect[0]+'>0</option>' +
            '<option value="1"'+hotelSelect[1]+'>1</option>' +
            '<option value="2"'+hotelSelect[2]+'>2</option>' +
            '<option value="3"'+hotelSelect[3]+'>3</option>' +
            '<option value="4"'+hotelSelect[4]+'>4</option>' +
            '<option value="5"'+hotelSelect[5]+'>5</option>' +
            '<option value="6"'+hotelSelect[6]+'>6</option>' +
            '<option value="7"'+hotelSelect[7]+'>7</option>' +
            '<option value="8"'+hotelSelect[8]+'>8</option>' +
            '<option value="9"'+hotelSelect[9]+'>9</option>' +
            '<option value="10"'+hotelSelect[10]+'>10</option>' +
            '<option value="11"'+hotelSelect[11]+'>11</option>' +
            '<option value="12"'+hotelSelect[12]+'>12</option>' +
          '</select>' + 
        '</div>' +
      '');
    }
  });

function pLang(){
    const language = document.documentElement.lang;
    var currentLang = language.split("-")[0];
    var code;
        switch(currentLang){ 
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

function pRoomsWebApp(form){

  const totHabitaciones = parseInt(form.getElementById('habitaciones').querySelectorAll('.counter')[0].innerHTML);
  const listadoCamas = form.querySelectorAll('.b-more-beds')[0];
  const perfiles = listadoCamas.querySelectorAll('.uk-grid-collapse.uk-grid.uk-grid-stack');
  const edades = listadoCamas.querySelectorAll('.mt-0.uk-grid-collapse.uk-grid.uk-grid-stack');

  const listSalida = [];

  for(var i = 0; i<totHabitaciones; i++)
  {
    let adultos = parseInt(perfiles[i].getElementsByClassName("ac-item")[0]);
    let kids = parseInt(perfiles[i].getElementsByClassName("kc-item")[0]);

    let kidsAge = [];
    let kidsAgeSelector = edades[i].querySelectorAll(".bmb-kids-cont select.uk-select");
    for(var o = 0; o<kids; o++)
    {
      kidsAge.add(kidsAgeSelector[o].value);
    }
    listSalida.add([adultos, kids, kidsAge]);
  }

  return listSalida;

/*

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
  return total;*/
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
if(typeof UIkit !== "undefined")
{
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
}
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

/***** END BE JS */