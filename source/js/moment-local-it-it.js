//! moment.js locale configuration

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortDot = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
        monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

    var monthsParse = [/^Jan/i, /^Feb/i, /^Mar/i, /^Apr/i, /^May/i, /^Jun/i, /^Jul/i, /^Aug/i, /^Sep/i, /^Oct/i, /^Nov/i, /^Dec/i];
    var monthsRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December|Jan\.?|Feb\.?|Mar\.?|Apr\.?|May\.?|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Oct\.?|Nov\.?|Dec\.?)/i;

    var en = moment.defineLocale('en-gb', {
        months : 'January February March April May June July August September October November December'.split(' '),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsRegex : monthsRegex,
        monthsShortRegex : monthsRegex,
        monthsStrictRegex : /^(January|February|March|April|May|June|July|August|September|October|November|December)/i,
        monthsShortStrictRegex : /^(Jan\.?|Feb\.?|Mar\.?|Apr\.?|May\.?|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Oct\.?|Nov\.?|Dec\.?)/i,
        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,
        weekdays : 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
        weekdaysShort : 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
        weekdaysMin : 'Su Mo Tu We Th Fr Sa'.split(' '),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse : /\d{1,2}(st|nd|rd|th)/,
         ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return en;

})));

/** EXTRA CONTENT **/
function be_month_short(e)
{
   var rs;
   switch(e)
   {
      case 1: rs = " Jan"; break;
      case 2: rs = " Feb"; break;
      case 3: rs = " Mar"; break;
      case 4: rs = " Apr"; break;
      case 5: rs = " May"; break;
      case 6: rs = " Jun"; break;
      case 7: rs = " Jul"; break;
      case 8: rs = " Aug"; break;
      case 9: rs = " Sep"; break;
      case 10: rs = " Oct"; break;
      case 11: rs = " Nov"; break;
      case 12: rs = " Dec"; break;
   }
   return rs;
}

function be_month_long(e)
{
   var rs;
   switch(e)
   {
      case 1: rs = " January"; break;
      case 2: rs = " February"; break;
      case 3: rs = " March"; break;
      case 4: rs = " April"; break;
      case 5: rs = " May"; break;
      case 6: rs = " June"; break;
      case 7: rs = " July"; break;
      case 8: rs = " August"; break;
      case 9: rs = " September"; break;
      case 10: rs = " October"; break;
      case 11: rs = " November"; break;
      case 12: rs = " December"; break;
   }
   return rs;
}

function be_day_short(e)
{
   var rs;
   switch(e)
   {
      case 1: rs = "Mo"; break;
      case 2: rs = "Tu"; break;
      case 3: rs = "We"; break;
      case 4: rs = "Th"; break;
      case 5: rs = "Fr"; break;
      case 6: rs = "Sa"; break;
      case 7: rs = "Su"; break;
   }
   return rs;
}

function be_day_long(e)
{
   var rs;
   switch(e)
   {
      case 1: rs = "Monday"; break;
      case 2: rs = "Tuesday"; break;
      case 3: rs = "Wednesday"; break;
      case 4: rs = "Thursday"; break;
      case 5: rs = "Friday"; break;
      case 6: rs = "Saturday"; break;
      case 7: rs = "Sunday"; break;
   }
   return rs;
}

function be_search_text(e)
{
   var rs;
   switch(e)
   {
      case "0": rs = "Any Hotel"; break;
      case "1": rs = "Alojamiento"; break;
      case "2": rs = "Check in"; break;
      case "3": rs = "Check out"; break;
      case "4": rs = "Rooms"; break;
      case "4_1": rs = "Room"; break;
      case "4_2": rs = "Adults"; break;
      case "4_3": rs = "Childs"; break;
      case "4_3_1": rs = "Age"; break;
      case "5": rs = "Select"; break;
      case "6": rs = "Código promo"; break;
      case "7": rs = "My bookings"; break;
      case "8": rs = "Book"; break;
      case "9": rs = "Código promocional"; break;
      case "10": rs = "P ej:MAJVR"; break;
      case "11": rs = "Select dates"; break;
      case "12": rs = "Accept"; break;
      case "error_1": rs = "Please, fill all required camps"; break;
   }
   return rs;
}