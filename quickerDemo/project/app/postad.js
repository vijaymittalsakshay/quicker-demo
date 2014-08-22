(function(global){
    var PostAdViewModel,
    	app = global.app = global.app || {};
    
    PostAdViewModel = kendo.data.ObservableObject.extend({
        
        show:function(){
            
            //for city dropdownlist
            $("#city").kendoDropDownList({
                optionLabel: "Select City",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Agra", id: 1 },
                    { name: "Aligarh", id: 2 },
                	{ name: "Bhopal", id: 3 },
                    { name: "Hyderabad", id: 4 }
                    ],
                index:0,
                select:function(e){
                   // var index = e.item.index();
                    app.postadService.viewModel.localityListView();
                }
            });
            
            //for category dropdownlist
            $("#category").kendoDropDownList({
                optionLabel: "Select Category",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Electronics", id: 1 },
                    { name: "Mobile", id: 2 },
                	{ name: "Entertainment", id: 3 },
                    { name: "Sports", id: 4 }
                    ],
                index:0,
                select:function(e){
                  
                }
            });
            
            //for subcategory dropdownlist
            $("#subcategory").kendoDropDownList({
                optionLabel: "Select Sub Category",
                cascadeFrom: "category",
                cascadeFromField: "parentId",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "Mp3 Player", id: 1, parentId: 1 },
                    { name: "Samsung", id: 2, parentId: 2 },
                	{ name: "Music", id: 3, parentId: 3 },
                    { name: "Basket", id: 4, parentId: 4 }
                    ],
                index:0,
                select:function(e){
                  $("#filterChoice").show();
                }
            });
            
            //for subcategory dropdownlist
            $("#brand").kendoDropDownList({
                optionLabel: "Select Brand",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: [
                    { name: "A", id: 1 },
                    { name: "B", id: 2},
                	{ name: "C", id: 3},
                    { name: "D", id: 4}
                    ],
                index:0,
                select:function(e){
                  
                }
            });
            
            //validation for postad 1st form
            $("#postadfrm1").validate({
                rules:{
                    adtitle:{
                        required:true,
                        minlength:4
                    },
                    AdDescription:{
                        required:true,
                        minlength:8
                    },
                    city:{
                        index:true
                    }
                },
                messages:{
                    adtitle:{
                        required:"Please Enter Ad Title."
                    },
                    AdDescription:{
                        required:"Please Enter Ad Description."
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
        
        //Locality list view Function
        localityListView:function(data){
          //  var index = data;
             $("#locality").kendoDropDownList({
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
        
        //dropdownlist validation function
        dropDownvalidationField:function(){
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
        
        //firstform data insert function
        postadFirstFormData:function(){
           
            apps.navigate("#postad2");
        },
            
       //first form submit function
        postadSubmitFirst:function(){
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
        
       //Second form submit function
        postadSubmitSecond:function(){
            alert("Second Form");
        }
           
    });
    
    app.postadService = {
      viewModel : new PostAdViewModel()  
    };
})(window);