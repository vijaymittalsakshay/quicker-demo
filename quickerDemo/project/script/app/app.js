(function(global){
	var app = global.app = global.app ||{};
    
    //initialize mobile application
     apps = new kendo.mobile.Application(document.body,
        												{
                                                            layout:'my-layout',
                                                            skin:'flat',
                                                            transition:''
                                                        }
    );
    
    //initialize everlive
    el = new Everlive(
    					{
                             apiKey: 'mPSABd4lT1mXOCxY', // set your API Key here
    						  scheme: 'http'
                        }
    );
    
    document.addEventListener("deviceready",function()
                                            {
                                           	 document.addEventListener("backbutton",onBackKeyDown,false);   
                                                window.cameraApp = new cameraApp();
                                                window.cameraApp.run();
                                            }
    ,false);
    
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
            var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';
             
            // Show the captured photo.
            smallImage.src = imageURI;
            console.log(smallImage.src);
   	 },

        _onPhotoDataSuccess: function(imageData) {
             var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';

            // Show the captured photo.
            smallImage.src = "data:image/jpeg;base64," + imageData;
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