(function(global){
    var PostAdViewModel,
    	app = global.app = global.app || {};
    
    
    
    PostAdViewModel = kendo.data.ObservableObject.extend({
        
        show:function(){
            
            $("#state").kendoDropDownList({		//for city dropdownlist
                optionLabel: "Select City",
                dataTextField: "stateName",
                dataValueField: "stateId",
                dataSource: {
                  transport:{
                      read:{
                          url:'project/data/state.json',
                          dataType:'json'
                      }
                  }  
                },
                index:0,
                select:function(e){
                   // var index = e.item.index();
                    app.postadService.viewModel.localityListView();
                }
            });
            
            
            $("#category").kendoDropDownList({			//for category dropdownlist
                optionLabel: "Select Category",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Car & Bikes", id: 1 },
                    { name: "Mobile & tabs", id: 2 },
                	{ name: "Electronics", id: 3 },
                    { name: "Education", id: 4 },
                	{ name: "Entertainment", id: 5 },
                	{ name: "Jobs", id: 6 },
                	{ name: "Lifestyle", id: 7 },
                	{ name: "Real state", id: 8 }
                    ],
                index:0,
                select:function(e){
                  
                }
            });
            
           
            $("#subcategory").kendoDropDownList({			 //for subcategory dropdownlist
                optionLabel: "Select Sub Category",
                cascadeFrom: "category",
                cascadeFromField: "parentId",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Car", id: 1, parentId: 1 },
                    { name: "Motorcycles", id: 2, parentId: 1 },
                	{ name: "Scooters", id: 3, parentId: 1 },
                    { name: "Bicycles", id: 4, parentId: 1 }
                    ],
                index:0,
                select:function(e){
                   var index = e.item.index();
                   switch(index)
                    {
                        case 1:
                        	$("#car_bikes").show();
                        	$("#brand").hide();
                        	break;
                        case 2:
                        	$("#car_bikes").show();
                        	$("#color_fuelType").hide();
                        	break;
                        
                        	
                        default:
                        break;
                    }
                }
            });
            
            
            $("#brand").kendoDropDownList({			//Brand dropdownlist
                optionLabel: "Brand",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                        { name: "Audi", id: 1 },
                        { name: "Bentley", id: 2},
                    	{ name: "BMW", id: 3},
                        { name: "Chevrolet", id: 4},
                    	{ name: "Daewoo", id: 5},
                    	{ name: "Fiat", id: 6},
                    	{ name: "Ford", id: 7},
                    	{ name: "Hindustan Motors", id: 8},
                    	{ name: "Honda", id: 9},
                    	{ name: "Mahindra", id: 11},
                    	{ name: "Maruti Suzuki", id: 12},
                    	{ name: "Mercedes Benz", id: 13},
                        { name: "Nissan", id: 14},
                    	{ name: "Opel", id: 15},
                        { name: "Renault", id: 16},
                    	{ name: "Rolls Royce", id: 17},
                    	{ name: "Skoda", id: 18},
                    	{ name: "Tata", id: 19},
                    	{ name: "Toyota", id: 20},
                    	{ name: "Volkaswagen", id: 21},
                    	{ name: "Volvo", id: 22},
                    	{ name: "Others", id: 23}
                    ],
                index:0,
                select:function(e){
                  
                }
            });
            
            var data = [2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,'Before 1999'];
             $("#year").kendoDropDownList({			//Year dropdownlist
                optionLabel: "Year",
                dataSource:data,
                select:function(e){
                  
                }
            });
            
             data = ['Red','Yellow','Black','White','Silver','Grey','Golden','Orange','Purple','Others'];
             $("#color").kendoDropDownList({			//Color dropdownlist
                optionLabel: "Color",
                dataSource:data,
                select:function(e){
                  
                }
            });
            
            data = ['CNG','Diesel','Electric','Hybrid','LPG','Petrol'];
             $("#fuelType").kendoDropDownList({			//Fuel type dropdownlist
                optionLabel: "Fuel Type",
                dataSource:data,
                select:function(e){
                  
                }
            });
            
            $.validator.addMethod("adTitle",
                function(value, element, params) {
                    var typedWords = jQuery.trim(value).split(' ').length;
                    if(typedWords  >= 4) {
                    return true;
                    }
                }
            );
            
             $.validator.addMethod("descriptionLength",
                function(value, element, params) {
                    var typedWords = jQuery.trim(value).split(' ').length;
                    if(typedWords  >= 8) {
                    return true;
                    }
                }
            );
           
            $("#postadfrm1").validate({			 //validation for postad 1st form
                rules:{
                    adtitle:{
                        required:true,
                       adTitle: true
                        
                    },
                    AdDescription:{
                        required:true,
                        descriptionLength:true
                    },
                    city:{
                        index:true
                    }
                },
                messages:{
                    adtitle:{
                        required:"Please Enter Ad Title.",
                        adTitle:"Please enter Ad title atleast 4 words."
                    },
                    AdDescription:{
                        required:"Please Enter Ad Description.",
                        descriptionLength:"Please enter Ad Description atleast 8 words."
                    },
                    city:{
                        required:"ok"
                    }
                },
                submitHandler:function(form){
                    return false;
                }
            });
            
           
        },
        
       
        localityListView:function(data){			 //Locality list view Function
          //  var index = data;
             $("#city").kendoDropDownList({
                optionLabel: "Choose Locality",
                cascadeFrom: "city",
                cascadeFromField: "parentId",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Saaket", id: 1, parentId: 1 },
                    { name: "Center Point", id: 2, parentId: 2 },
                    { name: "Kolar road", id: 3, parentId: 3 },
                    { name: "Krishna nagar", id: 4, parentId: 4 }
                ]
            });
        },
        
        
        dropDownvalidationField:function(){			//dropdownlist validation function
            
             var dropdownlist1 = $("#city").data("kendoDropDownList");
             var dropdownlist2 = $("#locality").data("kendoDropDownList");
          
            if(dropdownlist1.select() === 0)
            {
               navigator.notification.alert("Please select City",function(){},"Notification","OK");
                return false;
            }
            
            if(dropdownlist2.select() === 0)
            {
                navigator.notification.alert("Please select Locality",function(){},"Notification","OK");
                return false;
            }
            else
            { 
                app.postadService.viewModel.postadFirstFormData();
            }
        },
        
        backBTN:function(){
          navigator.notification.confirm("Would you like to cancel posting?",function(confirm){
              if(confirm === 1 || confirm === '1')
              {
                  apps.navigate("#home");
              }
          },"Notification","Yes,No");  
        },
        
         
        postadFirstFormData:function(){  					//1st form submit function
           
            apps.navigate("#postad2");
        },
        
        cameraCapture:function(){
          alert(navigator.appVersion);  
        },
       
        postadSubmitFirst:function(){						//first form submit function
          var status= $("#postadfrm1").valid();
            
            if(status === false)
            {
                return false;
            }
            else
            {  
                app.postadService.viewModel.dropDownvalidationField();  
                
            }
           // app.postadService.viewModel.postadFirstFormData();  
       },
       
        postadSubmitSecond:function(){					//Second form submit function
            
        },
        
       
           
    });
    
    app.postadService = {
      viewModel : new PostAdViewModel()  
    };
})(window);