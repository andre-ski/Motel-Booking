/*Array for the prices for each of the 3 rooms*/
var room_prices = new Array();
room_prices["Studio Unit"]=100; /*$100*/
room_prices["One Bedroom Unit"]=150; /*$150*/
room_prices["Two Bedroom Unit"]=225; /*$225*/

/*Gets the price of the room from the selected room type*/
function getRoomPrice() {
	var roomSelect = document.getElementById('room_type');
	return room_prices[roomSelect.value];
}
/*Gets the number of required rooms from the selected room amount*/
function getRoomAmount() {
	var roomAmount = document.getElementById('number_of_rooms');
	return roomAmount.value;
}
/*Gets whether or not breakfast is required*/
function getBreakfastPrice() {
	var breakfastPrice = document.getElementById('breakfast');
	/*If breakfast is wanted, price is $20, else nothing*/
	if(breakfastPrice.checked) {
		return(20);
	}else {
		return(0);
	}
}
/*Gets amount of adults selected*/
function getAdults() {
	var adultAmount = document.getElementById('number_of_adults');
	return adultAmount.value;
}
/*Gets amount of children selected*/
function getChild() {
	var childAmount = document.getElementById('number_of_children');
	return childAmount.value;
}
/*Calculates the total of the stay*/
function calculateTotal(){
	/*Price of room * number of rooms wanted + breakfasts required * nights of stay*/
	var total = ((getRoomPrice() * getRoomAmount()) + (getBreakfastPrice() * getAdults()) + (getBreakfastPrice() * getChild()))*day_difference() ;
	var totalEl = document.getElementById('totalCost');
	/*Show the total*/
	document.getElementById('totalCost').innerHTML = "Your Total is: $" + total;
	totalEl.style.display='block';
}
/*Hides the total*/
function hideTotal() {
	var totalEl = document.getElementById('totalCost');
	totalEl.style.display = 'none';
}
/*Hides the time selector*/
function hideTime() {
	var timeEta = document.getElementById('etaSection');
	timeEta.style.display='none';
}
/*Shows the time*/
function showTime() {
	var timeEta = document.getElementById('etaSection');
	timeEta.style.display='block';
}
/*Shows message when submit clicked*/
function showMessage(){
	window.alert("This button doesn't do anything yet!");
}
/*Shows email reminder*/
//function emailReminder() {
//	document.getElementById("emailMessage").innerHTML="Email must be correct as it will be used to send booking confirmation";
//}
/*Hides email reminder*/
//function hideReminder() {
//document.getElementById("emailMessage").innerHTML="";
//}

/*Function to work out the number of days of stay, help from source https://www.plus2net.com/javascript_tutorial/date-projects-difference-days.php*/
function day_difference(){
var t1=document.getElementById('end_date').value
t1=t1.split('-');
var dt_t1=new Date(t1[1],t1[0],t1[2]); // dd,mm,yyyy format to create date object
var dt_t1_tm=dt_t1.getTime(); // time in milliseconds for day 1

var t2=document.getElementById('start_date').value
t2=t2.split('-');
var dt_t2=new Date(t2[1],t2[0],t2[2]); 
var dt_t2_tm=dt_t2.getTime(); // time in milliseconds for day 2

var one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var diff_days=Math.abs((dt_t1_tm-dt_t2_tm)/one_day); // difference in days 
diff_days=Math.floor(diff_days);  // round off the difference in days to lower value

/*Return the result if end date after start date */
if(t1>t2)
	{
		return diff_days;
	}
	else
	{
		validateDate();
	}
}

//Validates if date is valid
function validateDate()
{
	msg="Dates are invalid";
	displayError(document.bookingForm.end_value, msg);
}

//Error variable set to false default
var error=false;

//Check if input is blank 
function checkBlank(i) 
{
	if(i.value=="")
	{
		var msg="This cannot be blank"
		displayError(i, msg)
		error==true;
		
	}else if(i.nextSibling.tagName==="SPAN")
	{
		i.nextSibling.textContent= " "; 
		i.style.border = "solid 1px red";
		error=false;
	}
	
}

//Checks if only the booking section is valid
function checkValid()
{
	var form=document.getElementById("bookingOnly");
	var elements=form.getElementsByTagName("input");
	for(var i=0;i<elements.length;i++)
	{
		if(elements[i].value==="")
		{
			if(elements[i].type==="checkbox")
			{ 
				return;
			}
			else
			{
				error=true;
				elements[i].style.border="solid 1px red";
				//alert(elements[i].id);
			}
		}
		
	}
	if(error==true)
	{
		alert("Please correct invalid inputs");
		
	}
	else if(error==false)
	{
		radioSelection();
	}
}

//Validates the first name
function validateFName(i)
			{	
				checkBlank(i);
				var fname_regexp= /[a-zA-Z]$/;
				var firstname = document.bookingForm.given_name_value;
				msg = "Given name is blank or contains invalid characters";
				var result = fname_regexp.test(i.value); 
				if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";	
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}

//Validates the surname
function validateSName(i)
			{	
				checkBlank(i);
				var sname_regexp= /[a-zA-Z]/;
				var surname= document.bookingForm.family_name_value;
				msg = "Surname is blank or contains invalid characters";
				var result = sname_regexp.test(i.value); 
				if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}
//Validate email email@dasasd.asda format
function validateEmail(i)
			{	
				checkBlank(i);
				var email_regexp =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/; 
				var email = document.bookingForm.email;
				msg="Invalid email"
				var result = email_regexp.test(i.value);
                if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}
//Validate phone number only digits
function validateNumber(i)
			{	
				checkBlank(i);
				var number_regexp =/[0-9]/; 
				var number = document.bookingForm.number;
				msg="Invalid number"
				var result = number_regexp.test(i.value);	
               if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}
//Validate the street, number string string		
function validateStreet(i)
			{	
				checkBlank(i);
				var street_regexp =/^(\d+\s[a-zA-Z]+\s[a-zA-Z]+)/g; 
				var street = document.bookingForm.street;
				msg="Invalid street"
				var result = street_regexp.test(i.value);
                if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}

//Validate city
function validateCity(i)
			{	
				checkBlank(i);
				var city_regexp =/[a-zA-Z]/; 
				var city = document.bookingForm.city;
				msg="Invalid city"
				var result = city_regexp.test(i.value);
				
                 if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}
//Validae region
function validateRegion(i)
			{	
				checkBlank(i);
				var region_regexp =/[a-zA-Z]/; 
				var region = document.bookingForm.region;
				msg="Invalid region"
				var result = region_regexp.test(i.value);
				
                 if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}
//Validate country
function validateCountry(i)
			{	
				checkBlank(i);
				var country_regexp =/[a-zA-Z]/;  
				var country = document.bookingForm.country;
				msg="Invalid country"
				var result = country_regexp.test(i.value);
				 if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}

//Validate card number to 16 digits
function validateCardNum(i)
{
				checkBlank(i);
				var cnum_regexp =/^\d{16}$/;  
				var cnum = document.bookingForm.ccn;
				msg="Invalid cardnum"
				var result = cnum_regexp.test(i.value);
				 if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName==="SPAN")
					{
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
}

//Validate cvv to 3 digits
function validateCvv(i)
{
				checkBlank(i);
				var cvv_regexp =/^\d{3}$/;  
				var cvv = document.bookingForm.cvv;
				msg="Invalid cvv"
				var result = cvv_regexp.test(i.value);
				 if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
}

//validate credit card name 
function validateCName(i)
{
				checkBlank(i);
				var chn_regexp= /[a-zA-Z]$/;
				var chn = document.bookingForm.chn;
				msg = "Card name invalid";
				var result = chn_regexp.test(i.value); 
				if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";	
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
}
//Validate post address	4 digits		
function validatePost(i)
			{	
				checkBlank(i);
				var post_regexp =/^\d{4}$/; 
				var post = document.bookingForm.post;
				msg="Invalid post code"
				var result = post_regexp.test(i.value);
				 if(!result)
				{
					displayError(i, msg);
					i.style.border="solid 1px red";
					error=true;
				}
				else if(i.nextSibling.tagName=="SPAN")
					{
						
						i.parentNode.removeChild(i.nextSibling);
						i.style.border="solid 1px green";	
						error=false;
					}
			}
//Display error code (from lecture week 6)
function displayError(element, msg)
			{
                if(element.nextSibling.tagName=="SPAN" && element.nextSibling.textContent.trim==msg.trim)
                 {
                    return;
                 }
              
                 var msgElement=document.createElement("span");
                 msgElement.textContent=msg;
                 msgElement.style.color="red";
                 element.parentNode.insertBefore(msgElement, element.nextSibling);
                 //element.style.border="solid 1px red";
			}
//Validates the entire payment section after payment shown			
function validatePayment()
{
	var form=document.getElementById("bookingForm");
	var elements=form.getElementsByTagName("input");
	for(var i=0;i<elements.length;i++)
	{
		if(elements[i].value==="")
		{
			if(elements[i].type==="checkbox")
			{ 
				return;
			}
			else
			{
				error=true;
				elements[i].style.border="solid 1px red";
				//alert(elements[i].id + "hi" + elements[i].name + " " + i );
			}
		}
		
	}
	if(error==true)
	{
		alert("Please correct invalid inputs");
		
	}
	else if(error==false)
	{
		form.submit();
	}
}
			
//Hide the payment section on reset			
function hidePayment()
{
	var payment = document.getElementById("payment");
	payment.style.display="none";
}	

//Variables for the transition effect
var fadeNode;
var repeater;
var opacity = 0;
var increments = 100;
var increment_value = 1/increments;

//Implements fade in fade out using and shows the payment part of form
function radioSelection()
{
    var thisRadio = event.target;
    var div=document.getElementById("payment");
    if(thisRadio.id=="confirm")
    {
      
        div.style.opacity=0;
        opacity = 0;
        fadeNode = div;
        fadeIn(500);
        div.style.display="block";
    }
    else
    {
        opacity = 1;
        fadeNode = div;
        fadeOut(500);
    }
}

function fadeIn(duration)
{

     var interval = duration/increments;
     repeater = setInterval(increaseOpacity, interval);
    
}
function increaseOpacity() 
{
    
    if (opacity < 1.0) 
    {
        opacity = opacity + increment_value;
        fadeNode.style.opacity = opacity;
    } 
    else 
    {
        clearInterval(repeater);
    }
}
function fadeOut(duration)
{

     var interval = duration/increments;
     repeater = setInterval(decreaseOpacity, interval);
    
}
function decreaseOpacity() 
{
    
    if (opacity > 0) 
    {
        opacity = opacity - increment_value;
        fadeNode.style.opacity = opacity;
    } 
    else 
    {
        fadeNode.style.display="none";
        clearInterval(repeater);
    }
}





