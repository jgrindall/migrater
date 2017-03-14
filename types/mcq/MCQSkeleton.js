"use strict";


module.exports = 

{  
   "questions":[  
      {  
         "config":{  
            "type":"mcq",
            "data":{  
               "choices":[  
                  "True",
                  "False"
               ],
               "question":"",
               "correct":[  
                  "True"
               ]
            }
         },
         "questionId":"1"
      }
   ],
   "order":{  
      "start":"1",
      "edges":[  
		
      ]
   },
   "settings":{  
      "quizStyle":"quick",
      "introScreen":{  
         "version":1,
         "imageCache":{  
            "main":"/images/2quiz/introscreen/ques.jpg"
         },
         "mainImage":{  
            "src":"main",
            "className":"mainImageCentered",
            "edit":true
         },
         "text":{  
            "contents":"",
            "className":"textBottomCentered",
            "placeholderKey":"TEXT_PLACEHOLDER",
            "fontColorButton":{  
               "className":"introFontButton"
            },
            "font":{  
               "name":"Trebuchet MS",
               "size":16,
               "color":"#ffffff"
            },
            "voiceoverButton":{  
               "soundId":null
            }
         },
         "title":{  
            "contents":"",
            "className":"titleTopCentered",
            "backgroundColor":"#2661a9",
            "editTitleColorButton":{  
               "className":"introBgButton"
            },
            "fontColorButton":{  
               "className":"introFontButton"
            },
            "placeholderKey":"TITLE_PLACEHOLDER",
            "font":{  
               "name":"Tahoma",
               "size":42,
               "color":"#ffffff"
            }
         },
         "backgroundBox":{  
            "backgroundColor":"#602581",
            "editBackgroundColorButton":{  
               "className":"introBgButtonMain"
            }
         },
         "timer":{  
            "data":{  
               "startTimeInSeconds":600,
               "endTimeInSeconds":0,
               "direction":"down",
               "timeOutMessage":"Time up",
               "wellDoneMessage":"Well done!"
            },
            "editTimerButton":{  
               "className":"introTimerButton"
            },
            "className":"introTimer"
         },
         "playButton":{  
            "label":"Play",
            "className":"introPlayButton"
         },
         "closeButton":{  
            "label":"",
            "className":"introCloseButton"
         },
         "sfxButton":{  
            "className":"introSfxPicker",
            "sheetName":"2quiz",
            "soundIds":{  
               "success":"2Simple Classic/Applause.mp3",
               "fail":"2Simple Classic/horn.mp3",
               "gameCompleted":"Game Sounds/Success 4.mp3"
            }
         }
      },
      "options":{  
         "hideThumbnails":false
      }
   },
   "creatorUserId":"1"
};
