$('.day').each(function() {
  var day = $(this).attr('id');
  $(this).append('<div id="label">' + day + ': </div>');
  $(this).append('<select name="' + day + 'FromH" class="hour from"></select>');
  $(this).append('<select name="' + day + 'FromM" class="min from"></select>');
  $(this).append('<select name="' + day + 'FromAP" class="ampm from"></select>');
  $(this).append(' to <select name="' + day + 'ToH" class="hour to"></select>');
  $(this).append('<select name="' + day + 'ToM" class="min to"></select>');
  $(this).append('<select name="' + day + 'ToAP" class="ampm to"></select>');
  $(this).append(' <input type="checkbox" name="notWorking" value="not working" class="notWorking"><span>not working</span>');

});

$('.hour').each(function() {
  for (var h = 1; h < 13; h++) {
      $(this).append('<option value="' + h + '">' + h + '</option>');
  }

  $(this).filter('.from').val('9');
  $(this).filter('.to').val('5');
});

$('.min').each(function() {
  var min = [':00', ':15', ':30', ':45'];
  for (var m = 0; m < min.length; m++) {
      $(this).append('<option value="' + min[m] + '">' + min[m] + '</option>');
  }

  $(this).val(':00');
});

$('.ampm').each(function() {
  $(this).append('<option value="AM">AM</option>');
  $(this).append('<option value="PM">PM</option>');

  $(this).filter('.from').val('AM');
  $(this).filter('.to').val('PM');
});

$('input').change( function() { 
  if($(this).filter(':checked').val() == "closed") {
      $(this).siblings('select').attr('disabled', true);
  } else {
      $(this).siblings('select').attr('disabled', false);
  }
});

$('#Saturday .closed, #Sunday .closed').val(["closed"]).siblings('select').attr('disabled', true);