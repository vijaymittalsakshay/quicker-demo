(function(global){
    var ProductDataModal,
    	app = global.app = global.app || {};
    
    ProductDataModal = kendo.data.ObservableObject.extend({
        
        automobileValue:function(){
            alert("ok");
        }
    });
    
    app.productService = {
      viewModel: new ProductDataModal()
    };
})(window);