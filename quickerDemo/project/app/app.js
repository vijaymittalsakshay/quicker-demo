(function(global){
    var app = global.app = global.app ||{};
    
   
    apps = new kendo.mobile.Application(document.body,
    												{
                                                        layout:'my-layout',
                                                        skin:'flat',
                                                        transition:'zoom'
                                                    }
    									);
    
    el = new Everlive(
    						{
                                 apiKey: 'mPSABd4lT1mXOCxY', // set your API Key here
       						  scheme: 'http'
                            }
    					);
    
    

    document.addEventListener("deviceready",function(){
   	 document.addEventListener("backbutton",onBackKeyDown,false);
        window.cameraApp = new cameraApp();
        window.cameraApp.run();
    },false);
    
    function id(element) {
    	return document.getElementById(element);
	}
    
    function cameraApp(){}
    
    cameraApp.prototype={
        _pictureSource: null,
        _destinationType: null,
        
        run: function(){
            var that=this;
            
    	    that._pictureSource = navigator.camera.PictureSourceType;
    	    that._destinationType = navigator.camera.DestinationType;
            
    	    id("capturePhotoButton").addEventListener("click", function(){
                that._capturePhoto.apply(that,arguments);
            });
            
            id("getPhotoFromAlbumButton").addEventListener("click", function(){
            	that._getPhotoFromAlbum.apply(that,arguments);
       	 });
        },
        
        _capturePhoto: function() {
            var that = this;
            
            // Take picture using device camera and retrieve image as base64-encoded string.
            navigator.camera.getPicture(function(){
                that._onPhotoDataSuccess.apply(that,arguments);
            },function(){
                that._onFail.apply(that,arguments);
            },{
                quality: 50,
                destinationType: that._destinationType.DATA_URL
            });
        },
        
        _getPhotoFromAlbum: function() {
            var that= this;
           
            // On Android devices, pictureSource.PHOTOLIBRARY and
            // pictureSource.SAVEDPHOTOALBUM display the same photo album.
            that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    	},
        
        _getPhoto: function(source) {
            var that = this;
            // Retrieve image file location from specified source.
            navigator.camera.getPicture(function(){
                that._onPhotoURISuccess.apply(that,arguments);
            }, function(){
                cameraApp._onFail.apply(that,arguments);
            }, {
                quality: 50,
                destinationType: that._destinationType.FILE_URI,
                sourceType: source
            });
   	 },
        
        _onPhotoURISuccess: function(imageURI) {
            var index = $('#imageVal').val();
            if(index === 'undefined' || index === '')
            {
                index=0;
            }
            var ind;
            if(index<2)
            {
                 ind = ++index;
                var smallImage = document.getElementById('smallImage'+ind);
                var picture = document.getElementById('picture'+ind);
                smallImage.style.display = 'block';
                picture.style.display = 'block';
                smallImage.src = imageURI;
                app.postadService.viewModel.setValue(ind);
            }
            else
            {
                alert("You can save only 2 times Image.")
            }
            
            /*var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';
             
            // Show the captured photo.
            smallImage.src = imageURI;
            console.log(smallImage.src);*/
   	 },
        
        _onPhotoDataSuccess: function(imageData) {
            var index = $('#imageVal').val();
            if(index === 'undefined' || index === '')
            {
                index=0;
            }
            var ind;
           //app.postadService.viewModel.setValue(ind);
            if(index<2)
            {
                
                console.log("hi index"+index);
                ind = ++index;
                var smallImage = document.getElementById('smallImage'+ind);
                var picture = document.getElementById('picture'+ind);
                smallImage.style.display = 'block';
                picture.style.display = 'block';
                // Show the captured photo.
                smallImage.src = "data:image/jpeg;base64," + imageData;
                console.log(smallImage.src);
                app.postadService.viewModel.setValue(ind);
            }
            else
            {
               alert("You can save only 2 times Image.")
            }
          //  console.log("image value"+index);
           /* var smallImage = document.getElementById('smallImage');
            var picture = document.getElementById('picture');
            smallImage.style.display = 'block';
            picture.style.display = 'block';
        
            // Show the captured photo.
            smallImage.src = "data:image/jpeg;base64," + imageData;
            console.log(smallImage.src);*/
            
        },
        
        _onFail: function(message) {
            alert(message);
        }
	}
    
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
})(window);