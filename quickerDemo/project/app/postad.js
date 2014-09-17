(function(global){
    var PostAdViewModel, dataParam={},that = this,
    	app = global.app = global.app || {};
    
    
    
    PostAdViewModel = kendo.data.ObservableObject.extend({
        
        adtitle:'',
        addescript:'',
        state:0,
        city:0,
        address:'',
        email:'',
        mobileNumber:'',
        category:0,
        subcategory:0,
        hideVal:'',
        
        afterShow:function(){
            // app.postadService.viewModel.resetAllFields();
        },
        show:function(){
           // $("#postadDiv1").find(".km-scroll-container").css("-webkit-transform", "");
            
            var state_dataSource = new kendo.data.DataSource({
              transport:{
                  read:{
                      url:'project/data/state.json',
                      dataType:'json'
                  	}
                  }
            });
            
            $("#state").kendoDropDownList({		//for city dropdownlist
                optionLabel: "Select State",
                dataTextField: "stateName",
                dataValueField: "stateId",
                dataSource:state_dataSource,
                index:0,
                select:function(e){
                   // var index = e.item.index();
                    app.postadService.viewModel.localityListView(e);
                    $("#address").val("");
                    //$("#state").closest(".k-widget").hide();
                    //alert("hi");
                    //app.postadService.viewModel.testingFunction();
                }
            });
            
            
            $("#category").kendoDropDownList({			//for category dropdownlist
                optionLabel: "Select Category",
                dataTextField: "name",
                dataValueField: "id",
                dataSource:{
                    transport:{
                        read:{
                             url:'project/data/category.json',
                             dataType:'json'	
                        }
                    }
                },
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
                 dataSource:{
                    transport:{
                        read:{
                             url:'project/data/subcategory.json',
                             dataType:'json'	
                        }
                    }
                },
                index:0
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
           
            $.validator.addMethod("email_regexp",
                function(value, element) {
                    return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
                }
            );
            
            jQuery.validator.addMethod("lettersonly", 
            	function(value, element) {
             		 return this.optional(element) || /^[a-z]+$/i.test(value);
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
                    },
                    address:{
                        required:true
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
                    address:{
                        required:"Plesase Enter Address details."
                    }
                },
                submitHandler:function(form){
                    return false;
                }
            });
            
            
            $("#postadfrm2").validate({  //validation for second form
                rules:{
                    name:{
                      required:true,
                      lettersonly:true
                    },
                    email:{
                        required:true,
                        email_regexp:true
                    },
                    mobile:{
                        required:true,
                        number:true,
                        minlength:10
                    }
                },
                messages:{
                    name:{
                        required:"Please enter your name.",
                        lettersonly:"Alphabetic character only Please."
                    },
                    email:{
                        required:"Please Enter Email Address.",
                        email_regexp:"Please Enter valid Email Address."
                    },
                    mobile:{
                        required:"Please Enter Mobile number.",
                        number:"Please Enter 10 digit mobile number in valid format.",
                        minlength:"Please enter at least 10 number."
                    }
                    
                },
                submitHandler:function(form){
                    return false;
                }
            });
            
           
        },
        
       
        localityListView:function(e){			 //Locality list view Function
          //  var index = data;
           // console.log(e);
           // console.log(e.item[0]['textContent']);
            if(e.item.index() === 0 || e.item.index() === '0')
            {
                $("#cityId").closest(".k-widget").css("display","none");
            }
            else
            {
                    $("#cityId").kendoDropDownList({
                        optionLabel: "Choose City",
                        cascadeFrom: "state",
                        cascadeFromField: "stateId",
                        dataTextField: "CityName",
                        dataValueField: "cityId",
                        dataSource:{
                            transport:{
                                read:{
                                    url:'project/data/city.json',
                                    dataType:'json'
                                }
                            }
                        },
                        select:function(){
                            $("#address").show();
                        }
                   });
            }
            
        },
        
        
        dropDownvalidationFirstFormField:function(){			//dropdownlist validation function
            
             var dropdownlist1 = $("#state").data("kendoDropDownList");
             var dropdownlist2 = $("#cityId").data("kendoDropDownList");
          
            if(dropdownlist1.select() === 0)
            {
               navigator.notification.alert("Please select State",function(){},"Notification","OK");
                return false;
            }
            
            if(dropdownlist2.select() === 0)
            {
                navigator.notification.alert("Please Select City",function(){},"Notification","OK");
                return false;
            }
            else
            { 
                app.postadService.viewModel.postadFirstFormData();
            }
        },
        
        dropDownvalidationSecondFormField:function(){			//dropdownlist validation function
            
             var dropdownlist1 = $("#category").data("kendoDropDownList");
             var dropdownlist2 = $("#subcategory").data("kendoDropDownList");
          
            if(dropdownlist1.select() === 0)
            {
               navigator.notification.alert("Please select Category",function(){},"Notification","OK");
                return false;
            }
            
            if(dropdownlist2.select() === 0)
            {
                navigator.notification.alert("Please Select Sub category",function(){},"Notification","OK");
                return false;
            }
            else
            { 
                app.postadService.viewModel.postadSecondFormData();
            }
        },
        
        backBTN:function(){
          navigator.notification.confirm("Would you like to cancel posting?",function(confirm){
              if(confirm === 1 || confirm === '1')
              {
                  app.postadService.viewModel.resetAllFields();
                  apps.navigate("#home");
              }
          },"Notification","Yes,No");  
        },
        
        modalViewClose:function(){
           $("#capturePhotoButton").data("kendoMobileModalView").close();  
        },
        
        
        cameraClick:function(){
           app.postadService.viewModel.valueSet();
        },
        
        destroy:function(e){
            var totalImage = $("#imageVal").val();
            alert(totalImage);
            //console.log(e.target.parentNode.id);
            $("#"+e.target.parentNode.id).remove();
            var index = --totalImage;
            alert("remaining image"+index);
           this.set("hideVal",index);
        },
        
         
        postadFirstFormData:function(){  					//1st form submit function
           
           //apps.navigate("#postad2");
           
            var that = this;
            dataParam['adtitle'] =that.get("adtitle").trim();
            dataParam['addescript'] =that.get("addescript").trim();
            dataParam['state'] =that.get("state");
            dataParam['city'] =that.get("city");
            dataParam['address'] =that.get("address").trim();
            dataParam['imageSrc'] = $("#smallImage").attr('src');
            console.log(dataParam);
            apps.navigate("#postad2");
        },
        
        postadSecondFormData:function(){  					//1st form submit function
           
           //apps.navigate("#postad2");
           
            var status = $("#postadfrm2").valid();
            if(status === false)
            {
                return false;
            }
            else
            {
                var that = this;
            dataParam['name']=that.get("name");
            dataParam['category'] =that.get("category");
            dataParam['subcategory'] =that.get("subcategory");
            dataParam['email'] =that.get("email").trim();
            dataParam['mobile'] =that.get("mobileNumber");
            console.log(dataParam);
            //apps.navigate("#postad2");
            }
        }, 
       
        postadSubmitFirst:function(){						//first form submit function
         var status= $("#postadfrm1").valid();
            
            if(status === false)
            {
                return false;
            }
            else
            {  
                app.postadService.viewModel.dropDownvalidationFirstFormField();  
            }
          //  app.postadService.viewModel.dropDownvalidationFirstFormField();  
          //  apps.navigate("#postad2");
            
           // var dd = $("#state").data("kendoDropDownList");
           // console.log(dd.text());
       },
       
        postadSubmitSecond:function(){					//Second form submit function
            
          //  var status= $("#postadfrm2").valid();
            var dd = $("#postformsecond").click();
            
            if(dd)
            {
                 app.postadService.viewModel.dropDownvalidationSecondFormField();  
            }
        },
        
        
        resetAllFields:function(){
            var that = this;
            
            that.set("adtitle","");
            that.set("addescript","");
            that.set("state",0);
            that.set("city",0);
            that.set("address","");
            that.set("email","");
            that.set("mobileNumber","");
            that.set("category","");
            that.set("subcategory","");
            that.set("name","");
            $('input.error').css({"background-color":"white","border":"1px solid #B2B2B2"});
            $('label.error').css("display","none");
            $('textarea.error').css({"background-color":"white","border":"1px solid #B2B2B2"}); 
            $("#cityId").closest(".k-widget").css("display","none");
            $("#address").css("display","none");
			$('.km-content:visible').data('kendoMobileScroller').reset();
            $('#picture').css('display','none');
        },
        
        
        testingFunction:function(e){
            
           /* console.log(e.sender.element.context.id);
            var data = el.data('categoryList');
            data.get()
                .then(function(data){
                    console.log(data);
                    var a = JSON.stringify(data);
                    console.log(a);
                    
                    for(var i=0;i<data['count'];i++)
                    {
                      val = data['result'][i]['List'];  
                    }
                    console.log("value "+val);
                    console.log(data['result'][0]['List']);
                    console.log(data['count']);
                    console.log("Id:"+data['result'][0]['Id']);
                },
                function(error){
                    console.log(JSON.stringify(error));
                });
           
            $("#ddl").kendoDropDownList({
                        placeholder: "Choose City",
                        dataTextField: "List",
                        dataValueField: "Id",
                        dataSource:data['result'],
                        select:function(){
                            $("#address").show();
                        }
                   });
          
            
    var dataSource = new kendo.data.DataSource({
    data: [
    { name: "Jane Doe", age: 30 },
    { name: "John Doe", age: 33 }
    ]
    });
    dataSource.fetch(function(){
    var janeDoe = dataSource.at(0);
    console.log(janeDoe.name); // displays "Jane Doe"
    });*/
            
            
        },
        
        setValue:function(val){
            var a = this.get("hideVal");
            console.log("before"+a);
            this.set("hideVal",val);
            a = this.get("hideVal");
            console.log("after"+a);
        }
        
    });
    
    app.postadService = {
      viewModel : new PostAdViewModel()  
    };
})(window);