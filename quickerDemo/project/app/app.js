(function(global){
    var app = global.app = global.app ||{};
    
   
    apps = new kendo.mobile.Application(document.body,
    												{
                                                        layout:'my-layout',
                                                        skin:'flat',
                                                        transition:''
                                                    }
    									);
    
    el = new Everlive(
    						{
                                 apiKey: 'mPSABd4lT1mXOCxY', // set your API Key here
       						  scheme: 'http'
                            }
    					);

    document.addEventListener("deviceready",function(){
         app.postadService.viewModel.setCameraValue();
   	 document.addEventListener("backbutton",onBackKeyDown,false);  
    },false);
    
   
    
    
    
    var onBackKeyDown = function(e){					//onBackKeyDown function for backbutton
      var x = apps.view()['element']['0']['id'];
        
		if(x === "home")
        {
            //navigator.app.exitApp(); 
             navigator.notification.confirm('Do you really want to exit?',function(confirmed){
                
                if(confirmed === true || confirmed ===1)
                {
                 	navigator.app.exitApp();
                }
                
            },'Exit','Yes,No');
        }
        else if(x==="postad1" || x==="postad2")
        {
            e.preventdefault();
        }
        else
        {
            //history.go(-1);
           // navigator.app.backhistory();
        }
    };
    
    aa = function(){
        alert("ha");
    }
})(window);