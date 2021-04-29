
function podmiana(){
var podmiana = '';
var dopodmiany = '<!--#MIC1RPGainToLeft-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#MIC1RPGainToRight-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#LeftADCPGAGain-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#RightADCPGAGain-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#LeftDACVolume-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#RightDacVolume-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#DACL1toHPLCOMVolume-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#DACR1toHPRCOMVolume-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#ip-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);

var dopodmiany = '<!--#msk-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
var dopodmiany = '<!--#gw-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
var dopodmiany = '<!--#MicGain-->';
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);
document.body.innerHTML = document.body.innerHTML.replace(dopodmiany, podmiana);



}


function ipverify(ip_string, input_name)
{    
	var c;
	var n = 0;
	var ch = ".0123456789";
	if (ip_string.length < 7 || ip_string.length > 15)
		return false;     
	for (var i = 0; i < ip_string.length; i++)
    {
        c = ip_string.charAt(i);
        if (ch.indexOf(c) == -1)
            return false;
        else
        {
            if (c == '.')
            {
                if(ip_string.charAt(i+1) != '.')
                n++;
                else
                return false;
            }		
        }
    }
	if (n != 3) 
		return false;
	if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
		return false;
	szarray = [0,0,0,0];
	var remain;
	var i;
    for(i = 0; i < 3; i++)
    {
        var n = ip_string.indexOf('.');
        szarray[i] = ip_string.substring(0,n);
        remain = ip_string.substring(n+1);
        ip_string = remain;
    }
	szarray[3] = remain;
	for(i = 0; i < 4; i++)
	{
		if (szarray[i] < 0 || szarray[i] > 255)
		{
            return false;
		}
	}
	if(input_name != "mask")
	{
		if(szarray[0]==127)
		{
			return false;
		}
		if(szarray[0] >= 224 && szarray[0] <=239)
		{
			return false;
		}
	}		
	
	return true;
	
}

function macverify(mac_string)
{    
	var c;
	var n = 0;
	var ch = "-0123456789abcdefABCDEF";
	
	if (mac_string.length != 17)
		{
		return false; 
		}	
	for (var i = 0; i < mac_string.length; i++)
    {
        c = mac_string.charAt(i);
        if (ch.indexOf(c) == -1)
         {   
			return false;}
        else
        {
            if (c == '-')
            {
                if(mac_string.charAt(i+1) != '-')
                n++;
                else
				{
					return false;
				}
            }		
        }
    }
	if (n != 5) 
		{
			return false;
		}
		
	if (mac_string.indexOf('-') == 0 || mac_string.lastIndexOf('-') == (mac_string.length - 1))
		
		{
			return false;
		}
		
	
	return true;
	
}

function is_ipaddr(ip_string, input_name)
{
	if(ip_string.length == 0)
	{
        alert("Podaj adres IP!");
		return false;
	}  
	if (!ipverify(ip_string, input_name))
	{  
		if(input_name == "ip")
		{
			alert("Podany adres IP: " + document.forms["fLan"]["ip"].value + " jest niewlasciwy");
		}
		if(input_name == "mask")
		{
			alert("Podana maska podsieci: " + document.forms["fLan"]["mask"].value + " jest niewlasciwa");
		}
		if(input_name == "gw")
		{
			alert("Podany adres bramy domyslnej: " + document.forms["fLan"]["gw"].value + " jest niewlasciwy");
		}
		
		return false;
	}	
	
	
	return true;
}


function fLanTest()
{
	var MINIP = 1;
	var MAXIP = 254;

/*
	if(document.forms["fLan"]["mac"].value.length != 0)
	{
		if(!macverify(document.forms["fLan"]["mac"].value))
		{
			var element = document.forms["fLan"]["mac"];
			alert("Podany adres MAC: " + element.value + " jest niewlasciwy");
			if(element)
			{
				element.focus();
				element.select();
			}
			return false;
		}
	}
	else
	{
		alert("Podaj adres MAC!");
	}
*/

	if(document.forms["fLan"]["ip"].value.length != 0)
	{
		if(!is_ipaddr(document.forms["fLan"]["ip"].value, document.forms["fLan"]["ip"].name))
		{
			var element = document.forms["fLan"]["ip"];
			if(element)
			{
				element.focus();
				element.select();
			}
			return false;
		}
	}
	else
	{
		alert("Podaj adres IP!");
		return false;
	}
	
	if(document.forms["fLan"]["mask"].value.length != 0)
	{
		if(!is_ipaddr(document.forms["fLan"]["mask"].value, document.forms["fLan"]["mask"].name))
		{
			var element = document.forms["fLan"]["mask"];
			if(element)
			{
				element.focus();
				element.select();
			}
			return false;
		}
	}
	else
	{
		alert("Podaj maske podsieci!");
		return false;
	}


	if(document.forms["fLan"]["gw"].value.length != 0)
	{
		if(!is_ipaddr(document.forms["fLan"]["gw"].value, document.forms["fLan"]["gw"].name))
		{
			var element = document.forms["fLan"]["gw"];
			if(element)
			{
				element.focus();
				element.select();
			}
			return false;
		}
	}
	else
	{
		alert("Podaj adres bramy domyslnej!");
		return false;
	}

	return true;
}
function fMacTest()
{
	
	if(document.forms["fMac"]["mac"].value.length != 0)
	{
		if(!macverify(document.forms["fMac"]["mac"].value))
		{
			var element = document.forms["fMac"]["mac"];
			alert("Podany adres MAC: " + element.value + " jest niewlasciwy");
			if(element)
			{
				element.focus();
				element.select();
			}
			return false;
		}
	}
	else
	{
		alert("Podaj adres MAC!");
		return false;
	}
	
	return true;
}