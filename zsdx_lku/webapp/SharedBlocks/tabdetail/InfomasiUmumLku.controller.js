sap.ui.define([
    "com/zsdlku/zsdxlku/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (B, Controller, JSONModel, mobileLibrary, Filter, FilterOperator) {
        "use strict";

        var URLHelper = mobileLibrary.URLHelper;

        return B.extend("com.zsdlku.zsdxlku.SharedBlocks.tabdetail.InformasiUmumLku", {
            onInit: function () {

                // this.oModel = this.getOwnerComponent().getModel();
                // this.getView().setModel(this.oModel);
                // this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // this._oBusy = new sap.m.BusyDialog();
            },

            onChangeReqTop: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                var oSource = oEvent.getSource(),
                    oParams = oEvent.getParameters(),
                    oBindingContext = oSource.getBindingContext();
                var sObjectPath = oBindingContext.getPath(),
                    oObject = oBindingContext.getProperty(sObjectPath);
                this._readTop("/ZsdShTopSet", [new Filter("Zterm", FilterOperator.EQ, newValue)]).then(
                    function(oResolve){
                        var oResponse = oResolve.results[0];
                            this.getModel().setProperty(sObjectPath + "/head_to_info" + "/ReqTop", newValue);
                            this.getModel().setProperty(sObjectPath + "/head_to_info" + "/Ztagg", oResponse.Ztag1);
                            this.getModel().setProperty(sObjectPath + "/head_to_info" + "/ReqTopTxt", oResponse.Text1);

                    }.bind(this),
                    function(oReject){
    
                    }
                );
            
            },

            _readTop: function(sPath, oFilters){
                return new Promise( function (fnResolve, fnReject){
                    this.getModel().read(sPath, {
                        filters: oFilters,
                        success: function (oResponse) {
                            fnResolve(oResponse);
                        },
                        error: function (oError) {
                            fnReject(oError);
                        }
                    })
                }.bind(this));
            },

        });
    });
