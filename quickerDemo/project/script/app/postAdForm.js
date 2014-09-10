(function(global){
    var PostadDataModal,
    	dataParam={},
    	that = this,
    	app = global.app = global.app || {};
    
    PostadDataModal = kendo.data.ObservableObject.extend({
        
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
    });
    
    app.postadService = {
      viewModel : new PostadDataModal()  
    };
})(window);