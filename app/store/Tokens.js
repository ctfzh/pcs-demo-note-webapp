Ext.define("NotesApp.store.Tokens", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    
    config: {
        model: "NotesApp.model.Token",
        proxy: {
            type: 'localstorage'
        }
    }
});

