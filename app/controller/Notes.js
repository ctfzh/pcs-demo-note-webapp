Ext.define("NotesApp.controller.Notes", {

    extend: "Ext.app.Controller",
    
    requires: ['Ext.data.JsonP'],
    
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            notesLoginView: "loginview",
            notesListView: "noteslistview",
            noteEditorView: "noteeditorview",
            notesList: "#notesList"
        },
        control: {
            notesLoginView:{
                loginNoteCommand: "onLoginNoteCommand"
            },
            notesListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            noteEditorView: {
                // The commands fired by the note editor.
                saveNoteCommand: "onSaveNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            }

        }
    },
    // Transitions
    slideLeftTransition: {type: 'slide', direction: 'left'},
    slideRightTransition: {type: 'slide', direction: 'right'},

    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {

        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },
    
    
    onLoginNoteCommand: function(){
        
        console.log("onLoginNoteCommand");
        
        var notesStore = Ext.getStore("Notes");
        var  narrative ;
        
        console.log("this is debug 1");
        
        baidu.require('connect', function(connect){
                connect.init( '48FTB4PjV71jlCifBllSe50W',{
			status:true
		});
				   			
                connect.login(function(info){
                        access_token = info.session.access_token;//获取access_token
                        
                        //store access_token 
                        var tokenStore = Ext.getStore("Tokens");
                        tokenStore.add({token:access_token});
                        tokenStore.sync();
                        
          
                        Ext.data.JsonP.request({
                                url: 'https://pcs.baidu.com/rest/2.0/pcs/file',
                                callbackKey: 'callback',
                                params: {
                                        access_token : access_token,
                                        method: 'list',
                                        path: '/apps/云端记事本'
                                },
                                success: function(result, request) {

                                    // Get  data from the json object result                    
                                    for(index = 0;index <result.list.length;index++ ){
                                        path = result.list[index].path.toString();
                                        file = path.substr('/apps/云端记事本/'.length, path.length);                                        
                                        title = file.substr(0,file.length-'.txt'.length);                                       
                                        
                                        second = result.list[index].mtime                                       
                                        date = new Date();
                                        date.setFullYear(1970,1,1);
                                        date.setTime(0);
                                        date.setMilliseconds(second*1000);

                                        noteId = (date.getTime()).toString(); //+ (this.getRandomInt(0, 100)).toString();                                       
                                        
                                        Ext.Ajax.request({
                                                url: 'http://127.0.0.1/WebNoteDemo/download.php',
                                                method: 'GET',
                                                disableCaching: false,
                                                
                                                params: {
                                                        access_token : access_token,
                                                        method: 'download',
                                                        title: title,
                                                        noteid: noteId,
                                                        path: '/apps/云端记事本/'+title+".txt"
                                                },

                                                success: function(response) {
                                                    
                                                    console.log("start"+title +"---"+noteId); 
                                                    var result = response.responseText;  
                                                    var json = eval("(" + result + ")");                                                  
                                                    
                                                    narrative = json.content;
                                                    
                                                    noteId = json.noteid;
                                                    title = json.title;
                                                    
 //                                                   console.log(narrative);
 
                                                    var noteRecord = Ext.create("NotesApp.model.Note", {
                                                             id: noteId,
                                                             flag: 0,
                                                             dateCreated: date,
                                                             title: title,
                                                             narrative: narrative
                                                        });                                               
                                                
                                                     if (null == notesStore.findRecord('id',noteId)) {
                                                            notesStore.add(noteRecord);
                                                            console.log("123213123"+title); 
                                                            console.log(narrative);
                                                        } 

                                                    notesStore.sync();
                                                   
                                                    notesStore.sort([{property: 'dateCreated', direction: 'DESC'}]);   
                                                }
                                            });                            
                                                           
                                    }                                                       
                                }
                        });                                      
                       
		});
	});
        this.activateNotesList();
    },
    // Commands.
    onNewNoteCommand: function () {

        console.log("onNewNoteCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("NotesApp.model.Note", {
            id: noteId,
            flag : 0,
            dateCreated: now,
            title: "",
            narrative: ""
        });

        this.activateNoteEditor(newNote);

    },
    onEditNoteCommand: function (list, record) {

        console.log("onEditNoteCommand");
        
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
        
        record.set("id",noteId);
        record.set("dateCreated",now);
        record.set("flag",1);

        this.activateNoteEditor(record);
    },
    
    onSaveNoteCommand: function () {

        console.log("onSaveNoteCommand");

        var noteEditorView = this.getNoteEditorView();

        var currentNote = noteEditorView.getRecord();
        
        var noteId = currentNote.get("id");
        
        var date = currentNote.get("dateCreated");
        
        var tokenStore = Ext.getStore("Tokens");
        
        access_token = tokenStore.getAt(0).get("token");
        
        console.log(access_token);
        
        console.log("flag:"+currentNote.get("flag"));
        
        if (currentNote.get("flag")) {
             
            var notesStore = Ext.getStore("Notes");         
            notesStore.remove(currentNote);
            notesStore.sync();
        
            console.log("this is debug");
 
            Ext.Ajax.request({
                url: 'http://127.0.0.1/WebNoteDemo/delete.php',
                method: 'GET',
                disableCaching: false,

                params: {
                        access_token : access_token,
                        method: 'delete',
                        path: '/apps/云端记事本/'+ currentNote.get("title")+".txt"
                       },

                success: function(response) {
                       var result = response.responseText;  
                       var json = eval("(" + result + ")");                                                  
                       console.log("delete:"+json.content);                                                                                                     
                }
             });
            
        }
               
        var newValues = noteEditorView.getValues();
        
        var noteRecord = Ext.create("NotesApp.model.Note", {
             id: noteId,
             flag: 0,
             dateCreated: date,
             title: newValues.title,
             narrative: newValues.narrative
        }); 

        var errors = noteRecord.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            noteRecord.reject();
            return;
        }

        notesStore = Ext.getStore("Notes");

        if (null == notesStore.findRecord('id', noteRecord.data.id)) {
            notesStore.add(noteRecord);
        }

        notesStore.sync();

        notesStore.sort([{property: 'dateCreated', direction: 'DESC'}]);
        
        console.log(newValues.narrative);
                         
         Ext.Ajax.request({
              url: 'http://127.0.0.1/WebNoteDemo/upload.php',
              method: 'GET',
              disableCaching: false,

              params: {
                        access_token : access_token,
                        method: 'upload',
                        path: '/apps/云端记事本/',
                        title: newValues.title+".txt",
                        content: newValues.narrative
                       },

               success: function(response) {
                       var result = response.responseText;  
                       var json = eval("(" + result + ")");                                                  
                       console.log("upload"+json.content);
                                                                                                     
               }
         });
        
        this.activateNotesList();
    },
    
    
    onDeleteNoteCommand: function () {

        console.log("onDeleteNoteCommand");

        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("Notes");
        
        var newValues = noteEditorView.getValues();
        
        
        notesStore.remove(currentNote);
        notesStore.sync();
        
        var tokenStore = Ext.getStore("Tokens");
        
        access_token = tokenStore.getAt(0).get("token");
        console.log(access_token);
        
         Ext.Ajax.request({
              url: 'http://127.0.0.1/WebNoteDemo/delete.php',
              method: 'GET',
              disableCaching: false,

              params: {
                        access_token : access_token,
                        method: 'delete',
                        path: '/apps/云端记事本/'+ newValues.title+".txt"
                       },

               success: function(response) {
                       var result = response.responseText;  
                       var json = eval("(" + result + ")");                                                  
                       console.log(json.content);                                                                                                     
               }
         });

        this.activateNotesList();
    },
    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Notes");
        notesStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});