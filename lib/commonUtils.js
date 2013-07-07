//공통 폼 속성 및 이벤트 설정 (주)닷넷소프트 유승호

 

//화면 처리 ASPX가 클라이언트에 Load된 후 실행해야 될 로직 처리

function fn_WindowOnLoad()

{

           try

           {

                     try

                     {

                                if(window.parent != null && window.parent.window != null && window.parent.window.InitAprFormProgressBar != null)

                                {

                                          window.parent.window.InitAprFormProgressBar(false);

                                }

                     }

                     catch(exception){}

                    

                     try

                     {

                                if ( document.all.errorMessage.value.length > 0 )// 1. 에러 메시지가 있는 경우 팝업 출력

                                          fn_OpenErrorMessage(document.all.errorMessage.value);

                                if ( document.all.informationMessage.value.length > 0 )// 2. Information이 있는 경우 팝업 출력

                                          fn_OpenInformation(document.all.informationMessage.value);

                                if ( document.all.confirmMessage.value.length > 0 )// 3. Confirm이 있는 경우 팝업 출력

                                          return fn_OpenConfirm(document.all.confirmMessage.value);

                                var strClose = ""

                                strClose = document.all.winClosed.value;

                                if ( strClose == "closed" )// 4. 팝업창 닫기

                                {

                                          if ( document.all.winClosed.getAttribute("return").length > 0 )

                                                                window.returnValue = document.all.winClosed.getAttribute("return");

                                          parent.self.close();

                                          top.window.close();

                                          return;

                                }

                                document.onkeydown = fn_PreventNavigateBack;// 5. 백스페이스로 이전 페이지로 가는 것을 막는다.

                     }

                     catch ( exception ){}

                    

                     try

                     {

                                // 7. 폼 Unload 확인

                                document.body.onbeforeunload = fn_ClosingCheck;

                                window.onbeforeprint = beforePrint;

                                window.onafterprint = afterPrint;

 

                                // 8. 사용자 정의 폼 로드 함수 호출

                                FormLoad();

                                ClientRedirect();

                     }

                     catch(exception){}

                    

                     try

                     {

                                //이미지 드래그 금지

                                for (i=0; i<document.images.length; i++)

                                {

                                          document.images[i].ondragstart = imgDragFalse;

                                }

                     }

                     catch(exception){}

           }

           catch(exception)

           {

                     fn_Progressbar(false);

           }

           finally

           {

                     fn_Progressbar(false);

           }

}

 

window.onload = fn_WindowOnLoad;

 

function imgDragFalse()

{

           return false ;

}

//Window_OnUnLoad 이벤트 발생전에 발생되는 이벤트, 페이지 닫기 취소를 할 수 있다.

//                     OnBeforeUnLoad 이벤트에 별도의 이벤트 핸들러를 연결하여 처리한다.

//                     ex) window.onbeforeunload = fnClosingChecker;

function fn_ClosingCheck()

{

           try

           {

                     var strMsg = FormBeforeUnLoad();

                    

                     if ( strMsg.length > 0 )

                     {

                                strMsg = "\n" + strMsg;

                                return strMsg;

                     }

           }

           catch ( exception ){}

}

 

//텍스트 박스 이외는 backspace 입력을 제한한다.

function fn_PreventNavigateBack()

{

           var strTagType;

           if ( window.event.keyCode == 8 )

           {

                     if ( window.event.srcElement.tagName.toUpperCase() == "INPUT" )

                     {

                                strTagType = window.event.srcElement.getAttribute("type").toUpperCase();

                                if ( strTagType == "TEXT")

                                {

                                          window.event.returnValue = true;

                                          return;

                                }

                     }

                     else if( window.event.srcElement.tagName.toUpperCase() == "TEXTAREA" )

                     {

                                window.event.returnValue = true;

                                return;

                     }

           }

           else

           {

                     window.event.returnValue = true;

           }

          

}

 

//커서셋팅

function fn_SetCursor(toggle)

{

           var oTemp = document.body;

           if(toggle)

           {

                     oTemp.style.cursor = "wait";

           }

           else

           {

                     oTemp.style.cursor = "default";

           }

}

 

//그리드에서 LinkCell에 마우스 올렸을때, TR에 스타일 지정하기

function fn_GridLinkCellStyleMouseOver(oThis,strTemp)

{

           var oTemp;

           oTemp = oThis;

           for(i = 0 ; i < 10 ; i++)

           {         

                     oTemp = oTemp.parentElement;

                     if(oTemp.tagName.toUpperCase() == 'TR')

                     {

                                oTemp.className = strTemp;

                                return;

                     }

           }

}

 

//프린트 하기전에 설정

function beforePrint()

{

           var i = 0 ;

           for(i = 0 ; i < document.all.length ; i++)

           {

                     if(document.all[i].pntOption != null)

                     {

                                if(document.all[i].pntOption == "true")

                                {

                                          document.all[i].style.display = "";                                             

                                }

                                else

                                {

                                          document.all[i].style.display = "none";                                                  

                                }

                     }

           }

          

          

}

 

//프린트 한후에 설정

function afterPrint()

{

           var i = 0 ;

           for(i = 0 ; i < document.all.length ; i++)

           {

                     if(document.all[i].pntOption != null)

                     {

                                if(document.all[i].pntOption == "false")

                                {

                                          document.all[i].style.display = "";                                             

                                }

                                else

                                {

                                          document.all[i].style.display = "none";                                                  

                                }

                     }

           }

          

           GoPrintingLog(); 

}

 

function GoPrintingLog()

{

           try

           {

                     /*

                     1.문서오픈모드 확인(읽기시에만 적용대상)

                     2.결재대상문서 확인(16종) :

                                협조전:GWOE_COOPER_CL_W01

                                일반품의서:GWOK_GENERAL

                                해외출장품의서:GWFY_OVER_BIZ_TRIP

                                대외문:GWOJ_VENDOR_W01

                                보고서:GWOK_REPORT_W01

                                회의록:GWOH_RECORD_W01

                                회의소집:GWOH_CALL_W01

                                일반투자품의 집행품의:GWOK_INVST_W01

                                일반투자품의 수정품의:GWOK_INVST_W01

                                일반투자품의 완료보고:GWOK_INVST_W02

                                프로젝트투자품의 사전집행개별품의:GWOK_PINVEST_W01

                                프로젝트투자품의 사전집행종합품의:GWOK_PINVEST_W02

                                프로젝트투자품의 기획품의:GWOK_PINVEST_W02

                                프로젝트투자품의 집행품의:GWOK_PINVEST_W02

                                프로젝트투자품의 수정품의:GWOK_PINVEST_W02

                                프로젝트투자품의 완료보고:GWOK_PINVEST_W03

                     //사용안함 2.보안설정확인(대외비이상) 평문:0,대외비:1,극비:2,비밀:3

                     3.소속회사 확인(현대,기아 임직원 대상)

                     4.UserID 쿠키값가져오기

                     5.XMLHTTP객체생성 XML전송

                     6.로그작성

                     7.로그작업 결과 확인

                     */

                     var oXmlDom = null;

                     var oXmlHttp = null;

                     var strUserInfo = "";

                     var strPage = "";

                     var strImportXml = "";

                     var bLogingDoc = false;   //로그 대상 문서여부

                     var arrSelectType = new Array("GWOE_COOPER_CL_W01", "GWOK_GENERAL", "GWFY_OVER_BIZ_TRIP", "GWOJ_VENDOR_W01", "GWOK_REPORT_W01", "GWOH_RECORD_W01", "GWOH_CALL_W01"

                                                                                               , "GWOK_INVST_W01", "GWOK_INVST_W02", "GWOK_PINVEST_W01", "GWOK_PINVEST_W02", "GWOK_PINVEST_W03");

                                                                                    

                     //로그 대상 문서 확인                                                                    

                     for(var i = 0; i < arrSelectType.length; i++)

                     {

                                if(typeof(parent.document.all["dcFormInfo"]) == undefined || typeof(parent.document.all["dcFormInfo"]) == "undefined")

                                {

                               

                                          if(GetDCValue("Header/SelectType") == arrSelectType[i])

                                          {

                                                     bLogingDoc = true;

                                                     break;

                                          }

                                }

                                else

                                {

                                          if(parent.document.all["dcFormInfo"].getvalue("Header/SelectType") == arrSelectType[i])

                                          {

                                                     bLogingDoc = true;

                                                     break;

                                          }

                                }

 

                               

                     }

                    

                    

                     if(typeof(parent.document.all["dcFormInfo"]) == undefined || typeof(parent.document.all["dcFormInfo"]) == "undefined")

                     {

                                          //읽기페이지 여부

                                if(GetDCValue("Header/Mode") != "" && GetDCValue("Header/Mode") != "SAVE" )

                                {

                                          if(bLogingDoc)

                                          {

                                                     //쿠키에서암호화된 사용자정보 가져오기(사용안함)

                                                     //strUserInfo = GetCookie("USERINFO");

                                                     //strUserInfo = strUserInfo.replace("+","%2B");

 

                                                     strImportXml =   "<Root>";

                                                     //strImportXml +=                    "<User>";

                                                     //strImportXml +=                               "<FullUserInfo><![CDATA["+strUserInfo+"]]></FullUserInfo>";

                                                     //strImportXml +=                    "</User>";

                                                     strImportXml +=           "<Doc>";

                                                     strImportXml +=                      "<Mode><![CDATA["+GetDCValue("Header/Mode")+"]]></Mode>";

                                                     strImportXml +=                      "<SelectType><![CDATA["+GetDCValue("Header/SelectType")+"]]></SelectType>";

                                                     strImportXml +=                      "<ProcessId><![CDATA["+GetDCValue("Header/ProcessId")+"]]></ProcessId>";

                                                     strImportXml +=                      "<ParentProcessId><![CDATA["+GetDCValue("Header/ParentProcessId")+"]]></ParentProcessId>";

                                                     strImportXml +=                      "<Security><![CDATA["+GetDCValue("Form/SECURITY")+"]]></Security>";

                                                     strImportXml +=                      "<Doc_No><![CDATA["+GetDCValue("Form/DOC_NO")+"]]></Doc_No>";

                                                     strImportXml +=                      "<Doc_Titl><![CDATA["+GetDCValue("Form/DOC_TITL")+"]]></Doc_Titl>";

                                                     strImportXml +=           "</Doc>";

                                                     strImportXml += "</Root>";

                                                     strPage = fn_GetWebRoot()+"WF/Common/Xml/PrintingLogDoc.aspx";

                                                    

                                                     oXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

                                                     oXmlHttp.open("POST", strPage, false);

                                                     oXmlHttp.send(strImportXml);

                                                    

                                                    

                                                     oXmlDom = new ActiveXObject("Microsoft.XMLDOM");

                                                     oXmlDom.async = false;

                                                     oXmlDom.preserveWhiteSpace = true;

                                                     oXmlDom.load(oXmlHttp.responseXML);

                                                    

                                                     //오류 처리                            

                                                     if(oXmlHttp.status != 200 )

                                                     {

                                                                fn_OpenErrorMessage("서버 응답 처리 오류<br> status:"+oXmlHttp.status+"<br> statusText:"+oXmlHttp.statusText);  

                                                                return;                                            

                                                     }

                                                     else if(oXmlHttp.responseXML.parseError.errorCode != 0)

                                                     {                                                              

                                                                fn_OpenErrorMessage("서버의 응답XML을 분석할 수 없습니다.<br> errorCode:"+oXmlHttp.responseXML.parseError.errorCode+"<br> reason:"+oXmlHttp.responseXML.parseError.reason);                                                          

                                                                return;

                                                     }

                                                    

                                                     //bResult = (oXmlDom.selectSingleNode("Root/Result").text == "Y") ? true : false;

                                                     if(oXmlDom.selectSingleNode("Root/Result").text == "N")

                                                     {

                                                                fn_OpenErrorMessage(oXmlDom.selectSingleNode("Root/ErrorMessage").text);                                                      

                                                     }                                                                                                         

                                          }         

                                }         

                     }

                     else

                     {

                                if(parent.document.all["dcFormInfo"].getvalue("Header/Mode") != ""  && parent.document.all["dcFormInfo"].getvalue("Header/Mode")  != "SAVE")

                                {

                                          if(bLogingDoc)

                                          {

                                                     strImportXml =   "<Root>";

                                                     //strImportXml +=                    "<User>";

                                                     //strImportXml +=                               "<FullUserInfo><![CDATA["+strUserInfo+"]]></FullUserInfo>";

                                                     //strImportXml +=                    "</User>";

                                                     strImportXml +=           "<Doc>";

                                                     strImportXml +=                      "<Mode><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Header/Mode")+"]]></Mode>";

                                                     strImportXml +=                      "<SelectType><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Header/SelectType")+"]]></SelectType>";

                                                     strImportXml +=                      "<ProcessId><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Header/ProcessId")+"]]></ProcessId>";

                                                     strImportXml +=                      "<ParentProcessId><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Header/ParentProcessId")+"]]></ParentProcessId>";

                                                     strImportXml +=                      "<Security><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Form/SECURITY")+"]]></Security>";

                                                     strImportXml +=                      "<Doc_No><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Form/DOC_NO")+"]]></Doc_No>";

                                                     strImportXml +=                      "<Doc_Titl><![CDATA["+parent.document.all["dcFormInfo"].getvalue("Form/DOC_TITL")+"]]></Doc_Titl>";

                                                     strImportXml +=           "</Doc>";

                                                     strImportXml += "</Root>";

                                                    

                                                     strPage = fn_GetWebRoot()+"WF/Common/Xml/PrintingLogDoc.aspx";

                                                    

                                                     oXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

                                                     oXmlHttp.open("POST", strPage, false);

                                                     oXmlHttp.send(strImportXml);

                                                    

                                                    

                                                     oXmlDom = new ActiveXObject("Microsoft.XMLDOM");

                                                     oXmlDom.async = false;

                                                     oXmlDom.preserveWhiteSpace = true;

                                                     oXmlDom.load(oXmlHttp.responseXML);

                                                    

                                                     //오류 처리                            

                                                     if(oXmlHttp.status != 200 )

                                                     {

                                                                fn_OpenErrorMessage("서버 응답 처리 오류<br> status:"+oXmlHttp.status+"<br> statusText:"+oXmlHttp.statusText);  

                                                                return;                                            

                                                     }

                                                     else if(oXmlHttp.responseXML.parseError.errorCode != 0)

                                                     {                                                              

                                                                fn_OpenErrorMessage("서버의 응답XML을 분석할 수 없습니다.<br> errorCode:"+oXmlHttp.responseXML.parseError.errorCode+"<br> reason:"+oXmlHttp.responseXML.parseError.reason);                                                          

                                                                return;

                                                     }

                                                    

                                                     //bResult = (oXmlDom.selectSingleNode("Root/Result").text == "Y") ? true : false;

                                                     if(oXmlDom.selectSingleNode("Root/Result").text == "N")

                                                     {

                                                                fn_OpenErrorMessage(oXmlDom.selectSingleNode("Root/ErrorMessage").text);                                                      

                                                     }                                                                                                         

                                          }

                                }

                     }                   

           }

           catch(exception)

           {

                     fn_OpenErrorMessage(exception.description);

           }

}

