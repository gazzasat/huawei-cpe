javascript:addButtons(); 

function currentBand() {
	$("#dhcp_mask").show(); 
	$("#dhcp_dns").show(); 
	$('#dhcp_primary_dns').show(); 
	$('#dhcp_secondary_dns').show(); 
	var token;
	/* add request for the session verification token to be used on subsequent API calls */
	$.ajax(
	{
		type:"GET", async:true, url:'/html/home.html', 
		error:function(request,status,error){
			alert("Token Error:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}, 
		success:function(data){
			var datas = data.split('name="csrf_token" content="'); 
			token = datas[datas.length-1].split('"')[0]; 
		}
	});

	$.ajax(
	{
		type:"GET", async : true, url: '/api/device/signal', 
		headers:{'__RequestVerificationToken':token}, 
		error:function(request,status,error){			
			alert("Signal Error:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}, 		
		success:function(data){
			vars=['rssi','rsrp','rsrq','sinr','dlbandwidth','ulbandwidth','band','cell_id','nei_cellid', 'plmn','pci','nrsinr','nrrsrp','nrrsrq','nrdlbandwidth']; 
			
			for (i=0;i<vars.length;i++) {
				window[vars[i]]=extractXML(vars[i],data); 
				$('#'+vars[i]).html(window[vars[i]]); 
				} 
			
			hex = Number(cell_id).toString(16); 
			hex2= hex.substring(0,hex.length-2); 
			enbid = parseInt(hex2, 16).toString(); 
			$('#enbid').html(enbid);
			
			setgraph("lte_rsrp",rsrp,-130,-60);
			setgraph("lte_rsrq",rsrq,-16,-3);
			setgraph("nr_rsrp",nrrsrp,-130,-60);
		}
	}); 
	
	$.ajax(
	{	
		type:"GET", async : true, url: '/api/net/net-mode', 
		headers:{'__RequestVerificationToken':token}, 
		error:function(request,status,error){
			alert("Signal Error:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}, 
		success:function(data){
			lteband=extractXML('LTEBand',data); 
			$('#allowed').html(_4GType(lteband)); 
		}
	}); 
	
	currentProvider();
} 

function currentProvider() {
	$.ajax(
	{	
		type:"GET", async : true, url: '/api/net/current-plmn', 
		error:function(request,status,error){
			alert("Provider Error:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}, 
		success:function(data){
			
			provider_name=extractXML('FullName',data); 
			provider_plmn=extractXML('Numeric',data); 
			$('#provider').html(provider_name); 
			$('#plmn').html(provider_plmn); 

		}
	}); 
}

function extractXML(tag, data) {
	try {
		var xml = data.toString();
		return xml.split("</"+tag+">")[0].split("<"+tag+">")[1]; 
	} catch(err) {
		return err.message; 
	} 
} 

function _4GType(data) {
	if ((data=='7E2880800D5')||(data=='20800800C5')||(data=='20000800C5')) 
		return "AUTO"; 
	
	data_out=""; 
	if ((parseInt(data,16)&(1<<0))==(1<<0)){data_out="B1 ";} 
	if ((parseInt(data,16)&(1<<2))==(1<<2)){data_out+="B3 ";} 
	if ((parseInt(data,16)&(1<<6))==(1<<6)){data_out+="B7 ";} 
	if ((parseInt(data,16)&(1<<7))==(1<<7)){data_out+="B8 ";} 
	if ((parseInt(data,16)&(1<<19))==(1<<19)){data_out+="B20 ";} 
	if ((parseInt(data,16)&(1<<27))==(1<<27)){data_out+="B28 ";} 
	if ((parseInt(data,16)&(1<<31))==(1<<31)){data_out+="B32 ";} 
	if ((parseInt(data,16)&(1<<33))==(1<<33)){data_out+="B34 ";} 
	if ((parseInt(data,16)&(1<<37))==(1<<37)){data_out+="B38 ";} 
	if ((parseInt(data,16)&(1<<38))==(1<<38)){data_out+="B39 ";} 
	if ((parseInt(data,16)&(1<<39))==(1<<39)){data_out+="B40 ";} 
	if ((parseInt(data,16)&(1<<40))==(1<<40)){data_out+="B41 ";} 
	if ((parseInt(data,16)&(1<<41))==(1<<41)){data_out+="B42 ";} 
	if ((parseInt(data,16)&(1<<42))==(1<<42)){data_out+="B43";}
	data_out=data_out.replace(/\++$/, ""); 
	return data_out; 
} 

function ltebandselection() {
	if(arguments.length==0) {
		var band = prompt("Please input desirable LTE band number, separated by + char (example 1+3+20).If you want to use every supported bands, write 'AUTO'.","AUTO"); 
		if(band==null||band===""){
			return;
		} 
	} 
	else 
		var band = arguments[0]; 
	
	var bs = band.split("+"); 
	var ltesum = 0;
	
	if(band.toUpperCase()==="AUTO"){
		ltesum = "7FFFFFFFFFFFFFFF";
	} else {
		for (var i=0;i<bs.length;i++){
			ltesum = ltesum + Math.pow(2,parseInt(bs[i])-1);
		} 
		ltesum = ltesum.toString(16); console.log("LTEBand:"+ltesum); } 
		$.ajax(
		{
			type:"GET", async:true, url:'/html/home.html', 
			error:function(request,status,error){
				alert("Token Error:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
			}, 
			success:function(data){
				var datas = data.split('name="csrf_token" content="'); 
				var token = datas[datas.length-1].split('"')[0]; 
				setTimeout(function(){
					$.ajax(
					{
						type:"POST", async: true, url:'/api/net/net-mode', headers:{'__RequestVerificationToken':token}, contentType: 'application/xml', data:'<request><NetworkMode>00</NetworkMode><NetworkBand>3FFFFFFF</NetworkBand><LTEBand>'+ltesum+'</LTEBand></request>', 
						success:function(nd){
							$("#band").html("<span style=\"color:green;\">OK</span>"); 
						}, 
						error:function(request,status,error){
							alert("Net Mode Error:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
						} 
					}); 
				}, 2000);
			}
		}
	); 
}	

function setgraph(a,n,l,r)
{
	trval=n,n=parseInt(n.replace("dBm","").replace("dB","")),x=((n=(n=r<n?r:n)<l?l:n)-l)/(r-l)*100,w=x<=30?30:x,ws=String(w)+String.fromCharCode(37),e="#"+a+"b",$(e).animate({width:ws,speed:"fast"}),$(e).html(a+" : "+trval),x<50?$(e).css("background-color","yellow").css("color","black"):(85<x?$(e).css("background-color","orange"):$(e).css("background-color","green")).css("color","white")
}

window.setInterval(currentBand, 2500); 

function addButtons() { 
	$("body").prepend("<style> .val{color:red;} .clear {clear: both; } .action{background-color: #448;padding: 10px;border-radius:10px;color: white;font-weight:bolder;margin-right: 5px;margin-left: 5px; } .action:hover{color: white;} li span{margin-left: 5px;} td span{margin-left: 5px; margin-right: 5px;} .f {float: left; border: 1px solid #bbb; border-radius: 5px; padding: 10px; line-height: 2em; margin: 5px; } .f ul {margin: 0; padding: 0; } .f ul li {display: inline; margin-right: 5px;margin-left: 5px; } .p {border-bottom: 1px solid #ccc; width: auto; height: 20px; } .v {height: 100%25; border-right:1px solid #ccc; padding-left: 20px; } .sb {padding: 10px; border-radius: 10px; display: inline-block; margin: 10px 0 10px 10px; } #provider, #plmn, #nr_rsrpb, #lte_rsrpb, #lte_rsrqb </style> <div class=\"p\"> <div class=\"v\" id=\"nr_rsrpb\"></div> </div> <div class=\"p\"> <div class=\"v\" id=\"lte_rsrpb\"></div> </div> <div class=\"p\"> <div class=\"v\" id=\"lte_rsrqb\"></div> </div> <div style=\"display:block;overflow: auto;\"> <div class=\"f\"> <ul> <li>RSRP:<span class=\"val\" id=\"rsrp\"></span></li> <li>RSRQ:<span class=\"val\" id=\"rsrq\"></span></li><li>RSSI:<span  class=\"val\" id=\"rssi\"></span></li><li>SINR:<span class=\"val\" id=\"sinr\"></span></li></ul> </div> <div class=\"f\"> <ul> <li>5G RSRP:<span class=\"val\" id=\"nrrsrp\">0</span</li><li>5G RSRQ:<span class=\"val\" id=\"nrrsrq\">0</span></li><li>5G SINR:<span class=\"val\" id=\"nrsinr\">0</span></li></ul></div><div class=\"f\"> <ul><li>PLMN:<li><span class=\"val\" id=\"plmn\"></span></li><span class=\"val\" id=\"provider\"></span></li></ul></div></div> <div style=\"display:block;overflow: auto;\"> <div class=\"f\"> <a style=\"font-weight:bolder;background-color: #448;color:white;padding: 10px;border-radius:10px;\" onclick=\"ltebandselection()\">BANDS</a> &nbsp;&nbsp; <a style=\"font-weight:bolder;background-color: #448;color:white;padding: 10px;border-radius:10px;\" onclick=\"selectPage('deviceinformation')\">INFO</a> &nbsp;&nbsp; <a style=\"font-weight:bolder;background-color: #448;color:white;padding: 10px;border-radius:10px;\" onclick=\"selectPage('dhcp')\">DNS</a> </div> <div class=\"f\"> <ul> <li>ENB ID:<span class=\"val\" style=\"font-weight:bold;\" id=\"enbid\">0</span></a></li><li>CELL ID:<span class=\"val\" id=\"cell_id\">0</span> </li><li>PCI :<span class=\"val\" id=\"pci\">0</span></li><li>Neighbours :<span class=\"val\" id=\"nei_cellid\">0</span></li><li>MAIN:&nbsp;<span class=\"val\" id=\"band\">0</span>:&nbsp;(<span class=\"val\" id=\"dlbandwidth\">0</span>/<span class=\"val\" id=\"ulbandwidth\">0</span>)</li><li>BANDS:<span class=\"val\" id=\"allowed\">0</span></li><li>5GNR DL:<span class=\"val\" id=\"nrdlbandwidth\">0</span></li></ul></div>"); 
}
