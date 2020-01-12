<template>
  <div>
    <div class="box" v-if="allData && Ctype == 2">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page1"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:14.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:29.7pt; margin:0pt 0pt 0pt 184pt">
          <span style="font-family:宋体; font-size:26pt; font-weight:bold">出境旅游合同</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:14.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">国</span>
          <span
            style="width:10pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:32pt"
          ></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">家</span>
          <span style="width:18pt; text-indent:0pt; display:inline-block"></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">旅</span>
          <span style="width:14pt; text-indent:0pt; display:inline-block"></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">游</span>
          <span style="width:14pt; text-indent:0pt; display:inline-block"></span>
          <span style="font-family:宋体; font-size:21.5pt; font-weight:bold">局</span>
        </p>
        <p style="line-height:17.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 0pt 0pt 404pt">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">制定</span>
        </p>
        <p style="line-height:17.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">国家工商行政管理总局</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 0pt 0pt 184pt">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">二〇一四年四月</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:19.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 0pt 0pt 259pt">
          <span style="font-family:宋体; font-size:9pt">1</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page2"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 0pt 0pt 195pt">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">使</span>
          <span
            style="width:21pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:238pt"
          ></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">用</span>
          <span
            style="width:22pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:282pt"
          ></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">说</span>
          <span
            style="width:22pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:326pt"
          ></span>
          <span style="font-family:宋体; font-size:21.5pt; font-weight:bold">明</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:18.35pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span
            style="font-family:宋体; font-size:15pt"
          >1.本合同为示范文本，供中华人民共和国境内（不含港、澳、台地区）经营出境旅游业务或者边境旅游业务的旅行社（以下简称“出境社”）与出境旅游者（以下简称“旅游者”）之间签订团队出境包价旅游（不含赴台湾地区旅游）合同时使用。</span>
        </p>
        <p style="line-height:4.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.2pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span
            style="font-family:宋体; font-size:15pt"
          >2.双方当事人应当结合具体情况选择本合同协议条款中所提供的选择项，空格处应当以文字形式填写完整。</span>
        </p>
        <p style="line-height:4.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.2pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span style="font-family:宋体; font-size:15pt">3.双方当事人可以书面形式对本示范文本内容进行变更或者补充</span>
          <span style="font-family:宋体; font-size:15pt; font-weight:bold">，</span>
          <span style="font-family:宋体; font-size:15pt">但变更或者补充的内容，不得减轻或者免除应当由出境社承担的责任。</span>
        </p>
        <p style="line-height:4.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.2pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span style="font-family:宋体; font-size:15pt">4.本示范文本由国家旅游局和国家工商行政管理总局共同制定、解释，在全国范围内推行使用。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">2</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page3"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:2.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 5pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">团队出境旅游合同</span>
        </p>
        <p style="line-height:16.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">旅游者：</span>
          <span
            style="width:65pt; text-indent:0pt; font-family:'Lucida Console'; font-size:12pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:137pt"
          >{{allData.touristsInfo.tourists[0].name}}</span>
          <span
            style="width:3pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:140pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt">等</span>
          <span
            style="width:18pt; text-indent:0pt; font-family:'Lucida Console'; font-size:10pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:170pt"
          >{{allData.touristsInfo.totalNumber}}</span>
          <span style="font-family:宋体; font-size:11.5pt; text-decoration:underline"></span>
          <span style="font-family:宋体; font-size:11.5pt">人（名单可附页，需出境社和旅游者代表签字盖章确认）；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">出境社：</span>
          <span
            style="width:35pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:107pt"
          ></span>
          <span
            style="width:198pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:305pt"
          >盈科美辰国际旅行社有限公司</span>
          <span style="font-family:宋体; font-size:12pt">；</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">旅行社业务经营许可证编号：</span>
          <span
            style="width:29pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:209pt"
          ></span>
          <span
            style="width:102pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:311pt"
          >L-BJ-CJ00423</span>
          <span style="font-family:宋体; font-size:12pt">。</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第一章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">术语和定义</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第一条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">本合同术语和定义</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <ol type="1" style="margin:0pt; padding-left:0pt">
          <li
            style="font-family:宋体; font-size:12pt; line-height:13.5pt; list-style-position:inside; margin:0pt 6pt 0pt 0pt; text-indent:24pt"
          >
            <span style="font:7.0pt 'Times New Roman'"></span>
            <span
              style="font-family:宋体; font-size:12pt"
            >团队出境旅游服务，指出境社依据《中华人民共和国旅游法》、《中国公民出国旅游管理办法》和《旅行社条例》等法律、法规，组织旅游者出国旅游及赴中外双方政府商定的国外边境区域和港、澳地区等旅游目的地旅游，代办旅游签证／签注，代订公共交通客票，提供餐饮、住宿、游览等两项以上服务活动。</span>
          </li>
        </ol>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 84pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.旅游费用，指旅游者支付给出境社，用于购买本合同约定的旅游服务的费用。旅游费用包括：</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 228pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（1）必要的签证/签注费用（旅游者自办的除外）；（2）交通费（含境外机场税）；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（3）住宿费；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（4）餐费（不含酒水费）；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 270pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（5）出境社统一安排的景区景点的门票费；（6）行程中安排的其他项目费用；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（7）导游服务费；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（8）边境旅游中办理旅游证件的费用；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 270pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（9）出境社、境外地接社等其他服务费用。旅游费用不包括：</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 306pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（1）办理护照、港澳通行证的费用；（2）办理离团的费用；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（3）旅游者投保的人身意外伤害保险费用；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（4）合同未约定由出境社支付的费用，包括但不限于行程以外非合同约定项目所需的费用、自行安排活动期间发生的费用;</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（5）境外小费;</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（6）行程中发生的旅游者个人费用，包括但不限于交通工具上的非免费餐饮费、行李超重费，住宿期间的洗衣、通讯 、饮料及酒类费用，个人娱乐费用，个人伤病医疗费，寻找个人遗失物品的费用及报酬，个人原因造成的赔偿费用。</span>
        </p>
        <p style="line-height:2.1pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >3.履行辅助人，指与旅行社存在合同关系，协助其履行本合同义务，实际提供相关服务的法人、自然人或者其他组织。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4.自由活动，特指《旅游行程单》中安排的自由活动。</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >5.自行安排活动期间，指《旅游行程单》中安排的自由活动期间、旅游者不参加旅游行程活动期间、每日行程开始前、结束后旅游者离开住宿设施的个人活动期间、旅游者经领队或者导游同意暂时离团的个人活动期间。</span>
        </p>
        <p style="line-height:2.1pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >6.不合理的低价，指出境社提供服务的价格低于接待和服务费用或者低于行业公认的合理价格，且无正当理由和充分证据证明该价格的合理性。其中，接待和服务费用主要包括出境社提供或者采购餐饮、住宿、交通、游览、导游或者领队等服务所支出的费用。</span>
        </p>
        <p style="line-height:2.1pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.5pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >7.具体购物场所，指购物场所有独立的商号以及相对清晰、封闭、独立的经营边界和明确的经营主体，包括免税店，大型购物商场，前店后厂的购物场所，景区内购物场所，景区周边或者通往景区途中的购物场所，服务旅游团队的专门商店，商品批发市场和与餐饮、娱乐、停车休息等相关联的购物场所等。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >8.旅游者投保的人身意外伤害保险，指旅游者自己购买或者通过旅行社、航空机票代理点、景区等保险代理机构购买的以旅行期间自身的生命、身体或者有关利益为保险标的的短期保险，包括但不限于航空意外险、旅游意外险、紧急救援保险、特殊项目意外险。</span>
        </p>
        <p style="line-height:0.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">9.离团，指团队旅游者在境外经领队同意不随团队完成约定行程的行为。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">10.脱团，指团队旅游者在境外未经领队同意脱离旅游团队，不随团队完成约定行程的行为。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 5pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">3</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page4"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:3.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >11.转团，指由于未达到约定成团人数不能出团，出境社征得旅游者书面同意，在行程开始前将旅游者转至其他出境社所组的出境旅游团队履行合同的行为。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >12.拼团，指出境社在保证所承诺的服务内容和标准不变的前提下，在签订合同时经旅游者同意，与其他出境社招徕的旅游者拼成一个团统一安排旅游服务的行为。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:11.5pt"
          >13.不可抗力，指不能预见、不能避免并不能克服的客观情况，包括但不限于因自然原因和社会原因引起的，如自然灾害、战争、恐怖活动、动乱、骚乱、罢工、突发公共卫生事件、政府行为。</span>
        </p>
        <p style="line-height:2.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >14.已尽合理注意义务仍不能避免的事件，指因当事人故意或者过失以外的客观因素引发的事件，包括但不限于重大礼宾活动导致的交通堵塞，飞机、火车、班轮、城际客运班车等公共客运交通工具延误或者取消，景点临时不开放。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >15.必要的费用，指出境社履行合同已经发生的费用以及向地接社或者履行辅助人支付且不可退还的费用, 包括乘坐飞机（车、船）等交通工具的费用（含预订金）、旅游签证/签注费用、饭店住宿费用（含预订金）、旅游观光汽车的人均车租等。</span>
        </p>
        <p style="line-height:0.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">16.公共交通经营者，指航空、铁路、航运客轮、城市公交、地铁等公共交通工具经营者。</span>
        </p>
        <p style="line-height:14.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的订立</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二条旅游行程单</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >出境社应当提供带团号的《旅游行程单》（以下简称《行程单》），经双方签字或者盖章确认后作为本合同的组成部分。《行程单》应当对如下内容作出明确的说明：</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（1）旅游行程的出发地、途经地、目的地、结束地，线路行程时间（按自然日计算，含乘飞机、车、船等在途时间，不足 24 小时以一日计）；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（2）旅游目的地地接社的名称、地址、联系人和联系电话；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 12pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:11.5pt"
          >（3）交通服务安排及其标准（明确交通工具及档次等级、出发时间以及是否需中转等信息）；（4）住宿服务安排及其标准（明确住宿饭店的名称、地址、档次等级及是否有空调、热水等相</span>
        </p>
        <p style="line-height:0.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">关服务设施）；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（5）用餐（早餐和正餐）服务安排及其标准（明确用餐次数、地点、标准）；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（6）出境社统一安排的游览项目的具体内容及时间（明确旅游线路内容包括景区点及游览项目名称、景区点停留的最少时间）；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（7）自由活动的时间；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（8）行程安排的娱乐活动（明确娱乐活动的时间、地点和项目内容）；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 30pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >《行程单》用语须准确清晰，在表明服务标准用语中不应当出现“准×星级”、“豪华”、“仅供参考”、“以××为准”、“与××同级”等不确定用语。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第三条订立合同</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >旅游者应当认真阅读本合同条款和《行程单》，在旅游者理解本合同条款及有关附件后，出境社和旅游者应当签订旅游合同。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">由旅游者的代理人订立合同的，代理人需要出具被代理的旅游者的授权委托书。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第四条旅游广告及宣传品</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >出境社的旅游广告及宣传品应当遵循诚实信用的原则，其内容符合《中华人民共和国合同法》要约规定的，视为本合同的组成部分，对出境社和旅游者双方具有约束力。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第三章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同双方的权利义务</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第五条 出境社的权利</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1.根据旅游者的身体健康状况及相关条件决定是否接纳旅游者报名参团；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.核实旅游者提供的相关信息资料；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3.按照合同约定向旅游者收取全额旅游费用；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4.旅游团队遇紧急情况时，可以采取安全防范措施和紧急避险措施并要求旅游者配合；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">5.拒绝旅游者提出的超出合同约定的不合理要求；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">6.要求旅游者对在旅游活动中或者在解决纠纷时损害出境社合法权益的行为承担赔偿责任；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">7.要求旅游者健康、文明旅游，劝阻旅游者违法和违反社会公德的行为。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第六条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">出境社的义务</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.按照合同和《行程单》约定的内容和标准为旅游者提供服务，不擅自变更旅游行程安排，不降低服务标准；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.向合格的供应商订购产品和服务；</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:19.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 11pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">4</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page5"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:3.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:23.75pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.不以不合理的低价组织旅游活动，诱骗旅游者，并通过安排购物或者另行付费旅游项目获取回扣等不正当利益；组织、接待旅游者，不指定具体购物场所，不安排另行付费旅游项目，但是，经双方协商一致或者旅游者要求，且不影响其他旅游者行程安排的除外；</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.6pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >4.在出团前采取行前说明会等方式，如实告知具体行程安排和有关具体事项。具体事项包括但不限于旅游目的地国家或者地区的相关法律、法规和风俗习惯、文化传统和宗教禁忌；旅游活动中的安全注意事项和安全避险措施、旅游者不适合参加旅游活动的情形；出境社依法可以减免责任的信息；境外小费标准、外汇兑换事项、应急联络方式（包括我驻外使领馆及出境社境内和境外应急联系人及联系方式）；法律、法规规定的其他应当告知的事项；</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >5.为旅游团队安排符合《中华人民共和国旅游法》、《旅行社条例》、《中国公民出国旅游管理办法》等法律、法规规定的持证领队人员；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">6.妥善保管旅游者交其代管的证件、行李等物品；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >7.为旅游者发放用中英文固定格式书写、由旅游者填写的安全信息卡（内容包括旅游者的姓名、国籍、血型、应急联络方式等）；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >8．旅游者人身、财产权益受到损害时，应采取合理必要的保护和救助措施，避免旅游者人身、财产权益损失扩大；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">9.积极协调处理旅游行程中的纠纷，采取适当措施防止损失扩大；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">10.提示旅游者按照规定投保人身意外伤害保险；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">11.向旅游者提供发票；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">12.依法对旅游者个人信息保密。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第七条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游者的权利</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1.要求出境社按照合同及《行程单》约定履行相关义务；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.拒绝出境社未经事先协商一致的转团、拼团行为；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.有权自主选择旅游产品和服务，有权拒绝出境社未与旅游者协商一致或者未经旅游者要求而指定购物场所、安排旅游者参加另行付费旅游项目的行为，有权拒绝出境社的导游、领队强迫或者变相强迫旅游者购物、参加另行付费旅游项目的行为；</span>
        </p>
        <p style="line-height:0.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4.在支付旅游费用时要求出境社出具发票；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">5.人格尊严、民族风俗习惯和宗教信仰得到尊重；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >6.在人身、财产安全遇有危险时，有权请求救助和保护；人身、财产受到侵害的，有权依法获得赔偿；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">7.在合法权益受到损害时向有关部门投诉或者要求出境社协助索赔；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >8.《中华人民共和国旅游法》、《中华人民共和国消费者权益保护法》和有关法律、法规赋予旅游者的其他各项权利。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第八条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游者的义务</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:center">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.如实填写《出境旅游报名表》、签证/签注资料和游客安全信息卡等各项内容，告知与旅游活动相关的个人健康信息，并对其真实性负责，保证所提供的联系方式准确无误且能及时联系；2.向出境社提交能有效使用的因私护照或者通行证，自办签证/签注者应当确保所持签证/签注</span>
        </p>
        <p style="line-height:0.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">在出游期间有效；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3.按照合同约定支付旅游费用；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4.按照合同约定随团完成旅游行程，配合领队人员的统一管理；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >5.遵守我国和旅游目的地国家（地区）的法律、法规和有关规定，不携带违禁物品出入境；不参与色情、赌博和涉毒活动；不擅自脱团；不在境外滞留不归；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >6.遵守旅游目的地国家（地区）的公共秩序和社会公德，尊重当地的风俗习惯，文化传统和宗教信仰，爱护旅游资源，保护生态环境，遵守《中国公民出国（境）旅游文明行为指南》等文明行为规范；</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >7.对国家应对重大突发事件暂时限制旅游活动的措施以及有关部门、机构或者旅游经营者采取的安全防范和应急处置措施予以配合；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">8.妥善保管自己的行李物品，随身携带现金、有价证券、贵重物品，不在行李中夹带；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >9.在旅游活动中或者在解决纠纷时，应采取适当措施防止损失扩大，不损害当地居民的合法权益，不干扰他人的旅游活动，不损害旅游经营者和旅游从业人员的合法权益，不采取拒绝上、下机（车、船）、拖延行程或者脱团等不当行为；</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >10.在自行安排活动期间，应当在自己能够控制风险的范围内选择活动项目，遵守旅游活动中的安全警示规定，对自己的安全负责。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:15.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 5pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">5</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page6"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:16.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第四章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的变更与转让</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第九条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的变更</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.出境社与旅游者双方协商一致，可以变更本合同约定的内容，但应当以书面形式由双方签字确认。由此增加的旅游费用及给对方造成的损失，由变更提出方承担；由此减少的旅游费用，出境社应当退还旅游者。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >2.行程开始前遇到不可抗力或者出境社、履行辅助人已尽合理注意义务仍不能避免的事件的，双方经协商可以取消行程或者延期出行。取消行程的，按照本合同第十四条处理；延期出行的，增加的费用由旅游者承担，减少的费用退还旅游者。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.行程中遇到不可抗力或者出境社、履行辅助人已尽合理注意义务仍不能避免的事件，影响旅游行程的，按以下方式处理：</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（1）合同不能完全履行的，旅行社经向旅游者作出说明，旅游者同意变更的，可以在合理范围内变更合同，因此增加的费用由旅游者承担，减少的费用退还旅游者。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（2）危及旅游者人身、财产安全的，旅行社应当采取相应的安全措施，因此支出的费用，由出境社与旅游者分担。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（3）造成旅游者滞留的，旅行社应采取相应的安置措施。因此增加的食宿费用由旅游者承担，增加的返程费用双方分担。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">第十条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt">合同的转让</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >旅游行程开始前，旅游者可以将本合同中自身的权利义务转让给第三人，出境社没有正当理由的不得拒绝，并办理相关转让手续，因此增加的费用由旅游者和第三人承担。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >正当理由包括但不限于：对应原报名者办理的相关服务不可转让给第三人的；无法为第三人办妥签证/签注、安排交通等情形的；旅游活动对于旅游者的身份、资格等有特殊要求的。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十一条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">不成团的安排</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >当未达到约定的成团人数不能成团时，旅游者可以与出境社就如下安排在本合同第二十三条中做出约定。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.转团：出境社可以在保证所承诺的服务内容和标准不降低的前提下，经事先征得旅游者书面同意，委托其他旅行社履行合同，并就受委托出团的出境社违反本合同约定的行为先行承担责任，再行追偿。旅游者和受委托出团的出境社另行签订合同的，本合同的权利义务终止。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >2.延期出团或者改签线路出团：出境社经征得旅游者书面同意，可以延期出团或者改签其他线路出团，因此增加的费用由旅游者承担，减少的费用出境社予以退还。需要时可以重新签订旅游合同。</span>
        </p>
        <p style="line-height:14.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第五章合同的解除</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十二条 出境社解除合同</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:11.5pt"
          >1.未达到约定的成团人数不能成团时，出境社解除合同的，应当采取书面等有效形式。出境社在行程开始前 30 日（按照出发日减去解除合同通知到达日的自然日之差计算，下同）以上（含第</span>
        </p>
        <p style="line-height:2.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.5pt; margin:0pt; text-align:justify; text-indent:0pt">
          <span style="font-family:宋体; font-size:12pt">30</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >日，下同）提出解除合同的，不承担违约责任，出境社向旅游者退还已收取的全部旅游费用（不得扣除签证/签注费用）；出境社在行程开始前 30 日以内（不含第 30 日，下同）提出解除合同的，除向旅游者退还已收取的全部旅游费用外，还应当按照本合同第十七条第 1 款的约定承担相应的违约责任。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >2.旅游者有下列情形之一的，出境社可以解除合同（相关法律、行政法规另有规定的除外）：（1）患有传染病等疾病，可能危害其他旅游者健康和安全的；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 180pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（2）携带危害公共安全的物品且不同意交有关部门处理的；（3）从事违法或者违反社会公德的活动的；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 120pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（4）从事严重影响其他旅游者权益的活动，且不听劝阻、不能制止的；（5）法律规定的影响合同履行的其他情形。</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >出境社因上述情形解除合同的，应当以书面等形式通知旅游者，按照本合同第十五条的相关约定扣除必要的费用后，将余款退还旅游者。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十三条 旅游者解除合同</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:11.5pt"
          >1.未达到约定的成团人数不能成团时，旅游者既不同意转团，也不同意延期出行或者改签其他线路出团的，出境社应及时发出不能成团的书面通知，旅游者可以解除合同。旅游者在行程开始前</span>
        </p>
        <p style="line-height:0.4pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 15pt; text-indent:-15pt">
          <span style="font-family:宋体; font-size:12pt">30</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt">日以上收到旅行社不能成团通知的，旅行社不承担违约责任，向旅游者退还已收取的全部旅游费</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:15.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">6</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page7"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:3.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-align:justify">
          <span
            style="font-family:宋体; font-size:12pt"
          >用；旅游者在行程开始前 30 日以内收到旅行社不能成团通知的，按照本合同第十七条第 1 款相关约定处理。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.6pt; margin:0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">
            2.除本条第 1 款约定外，在行程结束前，旅游者亦可以书面等形式解除合同（相关法律、行政法规另有规定的除外）。旅游者在行程开始前 30 日以上提出解除合同的，未办理签证/签注的，出境社应当向旅游者退还全部旅游费用；已办理签证/签注的，应当扣除签证/签注费用（旅游者自办的除外）；旅游者在行程开始前 30
            日以内提出解除合同的，出境社按照本合同第十五条相关约定扣除必要的费用后，将余款退还旅游者。
          </span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.旅游者未按约定时间到达约定集合出发地点，也未能在出发中途加入旅游团队的，视为旅游者解除合同，按照本合同第十五条相关约定处理。</span>
        </p>
        <p style="line-height:14.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold"
          >第十四条 因不可抗力或者已尽合理注意义务仍不能避免的事件解除合同</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.5pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >因不可抗力或者出境社、履行辅助人已尽合理注意义务仍不能避免的事件，影响旅游行程，合同不能继续履行的，出境社和旅游者均可以解除合同；合同不能完全履行，旅游者不同意变更的，可以解除合同（因已尽合理注意义务仍不能避免的事件提出解除合同的，相关法律、行政法规另有规定的除外）。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >合同解除的，出境社应当在扣除已向地接社或者履行辅助人支付且不可退还的费用后，将余款退还旅游者。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十五条 必要的费用扣除</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.旅游者在行程开始前 30 日以内提出解除合同或者按照本合同第十二条第 2 款约定由出境社在行程开始前解除合同的，按下列标准扣除必要的费用：</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.6pt; margin:0pt 231pt 0pt 24pt; text-align:justify">
          <span
            style="font-family:宋体; font-size:11.5pt"
          >行程开始前 29 日至 15 日，按旅游费用总额的 5%；行程开始前 14 日至 7 日，按旅游费用总额的 20%；行程开始前 6 日至 4 日，按旅游费用总额的 50%；行程开始前 3 日至 1 日，按旅游费用总额的 60%；行程开始当日，按旅游费用总额的 70%。</span>
        </p>
        <p style="line-height:0.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.在行程中解除合同的，必要的费用扣除标准为：</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >旅游费用×行程开始当日扣除比例+（旅游费用-旅游费用×行程开始当日扣除比例)÷旅游天数×已经出游的天数。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >如按上述第 1 款或者第 2 款约定比例扣除的必要的费用低于实际发生的费用，旅游者按照实际发生的费用支付，但最高额不应当超过旅游费用总额。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >解除合同的，出境社扣除必要的费用后，应当在解除合同通知到达日起 5 个工作日内为旅游者办结退款手续。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十六条 出境社协助旅游者返程及费用承担</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.5pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">
            旅游行程中解除合同的，出境社应协助旅游者返回出发地或者旅游者指定的合理地点。因旅行社或者履行辅助人的原因导致合同解除的，返程费用由出境社承担；行程中按照本合同第十二条第 2 款，第十三条第 2
            款约定解除合同的，返程费用由旅游者承担；按照本合同第十四条约定解除合同的，返程费用由双方分担。
          </span>
        </p>
        <p style="line-height:14.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第六章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">违约责任</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十七条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">出境社的违约责任</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.出境社在行程开始前 30 日以内提出解除合同的，或者旅游者在行程开始前 30 日以内收到出境社不能成团通知，不同意转团、延期出行和改签线路解除合同的，出境社向旅游者退还已收取的全部旅游费用（不得扣除签证／签注等费用），并按下列标准向旅游者支付违约金：</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.6pt; margin:0pt 183pt 0pt 24pt; text-align:justify">
          <span
            style="font-family:宋体; font-size:11.5pt"
          >行程开始前 29 日至 15 日，支付旅游费用总额 2%的违约金；行程开始前 14 日至 7 日，支付旅游费用总额 5%的违约金；行程开始前 6 日至 4 日，支付旅游费用总额 10%的违约金；行程开始前 3 日至 1 日，支付旅游费用总额 15%的违约金；行程开始当日，支付旅游费用总额 20%的违约金。</span>
        </p>
        <p style="line-height:2.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">如按上述比例支付的违约金不足以赔偿旅游者的实际损失，出境社应当按实际损失对旅游者予以赔偿。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >出境社应当在取消出团通知或者旅游者不同意不成团安排的解除合同通知到达日起 5 个工作日内，为旅游者办结退还全部旅游费用的手续并支付上述违约金。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:15.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">7</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page8"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:3.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >2.出境社未按合同约定提供服务，或者未经旅游者同意调整旅游行程（本合同第九条第 3 款规定的情形除外），造成项目减少、旅游时间缩短或者标准降低的，应当依法承担继续履行、采取补救措施或者赔偿损失等违约责任。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.5pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.出境社具备履行条件，经旅游者要求仍拒绝履行本合同义务的，出境社向旅游者支付旅游费用总额 30%的违约金，旅游者采取订同等级别的住宿、用餐、交通等补救措施的，费用由出境社承担；造成旅游者人身损害、滞留等严重后果的，旅游者还可以要求出境社支付旅游费用一倍以上三倍以下的赔偿金。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.5pt; margin:0pt 3pt 0pt 0pt; text-indent:23.75pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >4.未经旅游者同意，出境社转团、拼团的，出境社应向旅游者支付旅游费用总额 25%的违约金；旅游者解除合同的，出境社还应向未随团出行的旅游者退还全部旅游费用，向已随团出行的旅游者退还尚未发生的旅游费用。如违约金不足以赔偿旅游者的实际损失，出境社应当按实际损失对旅游者予以赔偿。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:23.75pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >5.出境社有以下情形之一的，旅游者有权在旅游行程结束后 30 日内，要求出境社为其办理退货并先行垫付退货货款，或者退还另行付费旅游项目的费用：</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:23.75pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（1）出境社以不合理的低价组织旅游活动，诱骗旅游者，并通过安排购物或者另行付费旅游项目获取回扣等不正当利益的；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-indent:23.75pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >（2）未经双方协商一致或者未经旅游者要求，出境社指定具体购物场所或者安排另行付费旅游项目的。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">6.与旅游者出现纠纷时，出境社应当积极采取措施防止损失扩大，否则应当就扩大的损失承担责任。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十八条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游者的违约责任</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >1.因不听从出境社及其领队的劝告、提示而影响团队行程，给出境社造成损失的，应当承担相应的赔偿责任。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.旅游者超出本合同约定的内容进行个人活动所造成的损失，由其自行承担。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.由于旅游者的过错，使出境社、履行辅助人、旅游从业人员或者其他旅游者遭受损害的，应当由旅游者赔偿损失。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:23.75pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >4.旅游者在旅游活动中或者在解决纠纷时，应采取措施防止损失扩大，否则应当就扩大的损失承担相应的责任。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >5.旅游者违反安全警示规定，或者对国家应对重大突发事件暂时限制旅游活动的措施、安全防范和应急处置措施不予配合，造成旅行社损失的，应当依法承担相应责任。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十九条 其他责任</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.35pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:11.5pt"
          >1.因旅游者提供材料存在问题或者自身其他原因被拒签、缓签、拒绝入境和出境的，相关责任和费用由旅游者承担，出境社将未发生的费用退还旅游者。如给出境社造成损失的，旅游者还应当承担赔偿责任。因出境社原因导致旅游者被拒签而解除合同的，依据本合同第十七条第 1 款处理。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >2.由于旅游者自身原因导致本合同不能履行或者不能按照约定履行，或者造成旅游者人身损害、财产损失的，出境社不承担责任。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >3.旅游者自行安排活动期间人身、财产权益受到损害的，出境社在事前已尽到必要警示说明义务且事后已尽到必要救助义务的，出境社不承担赔偿责任。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.3pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >4.由于第三方侵害等不可归责于出境社的原因导致旅游者人身、财产权益受到损害的，出境社不承担赔偿责任。但因出境社不履行协助义务致使旅游者人身、财产权益损失扩大的，应当就扩大的损失承担赔偿责任。</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >5.由于公共交通经营者的原因造成旅游者人身损害、财产损失依法应承担责任的，出境社应当协助旅游者向公共交通经营者索赔。</span>
        </p>
        <p style="line-height:14.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:24pt">
          <tr style="height:13.7pt">
            <td style="vertical-align:bottom; width:48pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt; font-weight:bold">第七章</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:216pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt; font-weight:bold">协议条款</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:72pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:14pt">
            <td style="vertical-align:bottom; width:48pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十条</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:216pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:12pt; font-weight:bold">线路行程时间</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:72pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.65pt">
            <td style="vertical-align:bottom; width:55pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">出发时间</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:216pt">
              <p style="line-height:13.7pt;">
                <span style="font-family:宋体; font-size:12pt">{{allData.itinerary?allData.itinerary.startDate:''}}</span>
                <span style="font-family:宋体; font-size:12pt">结束时间：{{allData.itinerary?allData.itinerary.endDate:''}}</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:48pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">共 {{allData.itinerary?allData.itinerary.days:''}}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:72pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">天，饭店住宿</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="margin:0pt">
                <span
                  style="font-family:'Times New Roman'; font-size:11.5pt"
                >{{allData.itinerary?allData.itinerary.nights:""}}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">夜。</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:48pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:78pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:60pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:78pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:72pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:48pt; border:none"></td>
            <td style="width:78pt; border:none"></td>
            <td style="width:60pt; border:none"></td>
            <td style="width:78pt; border:none"></td>
            <td style="width:24pt; border:none"></td>
            <td style="width:24pt; border:none"></td>
            <td style="width:72pt; border:none"></td>
            <td style="width:18pt; border:none"></td>
            <td style="width:24pt; border:none"></td>
          </tr>
        </table>
        <p style="line-height:0.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十一条 旅游费用及支付（以人民币为计算单位）</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">成人</span>
          <span
            style="width:17pt; text-indent:0pt; font-family:'Lucida Console'; font-size:10pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:65pt"
          >&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:12pt; text-decoration:underline"
          >{{allData.cost.adultCost}}</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >元/人，儿童（不满 14 岁）{{allData.cost.childCost}}元/人；其中，导游服务费</span>
          <span
            style="width:36pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:407pt"
          ></span>
          <span style="font-family:宋体; font-size:11.5pt">{{allData.cost.guideServiceCost }}元/人；</span>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
          <span style="font-family:宋体; font-size:12pt">{{allData.cost.guideServiceCost }}元/人</span>
        </p>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:24pt">
          <tr style="height:13.65pt">
            <td colspan="3" style="vertical-align:bottom; width:129pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">旅游费用合计 ：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:45pt">
              <p style="margin:0pt">
                <span
                  style="font-family:'Times New Roman'; font-size:11.5pt"
                >{{allData.cost.totalCost}}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:42pt">
              <p style="line-height:13.7pt; margin:0pt 12pt 0pt 0pt; text-align:right">
                <span style="font-family:宋体; font-size:12pt">元。</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:30pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:90pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:21pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:45pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:42pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:30pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:13pt">
            <td colspan="2" style="vertical-align:bottom; width:108pt">
              <p style="line-height:12.95pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">旅游费用支付方式：</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:100pt"
            >
              <p style="margin:0pt">
                <span
                  style="font-family:'Times New Roman'; font-size:11pt"
                >{{allData.cost.paymentMethod | getOrderPayType}}</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:87pt"
            >
              <p style="line-height:12.95pt; margin:0pt 53pt 0pt 0pt; text-align:right">
                <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:42pt">
              <p style="line-height:12.95pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">。</span>
              </p>
            </td>
          </tr>
          <tr style="height:13pt">
            <td colspan="2" style="vertical-align:bottom; width:108pt">
              <p style="line-height:12.95pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">旅游费用支付时间：</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:100pt"
            >
              <p style="margin:0pt">
                <span
                  style="font-family:'Times New Roman'; font-size:11pt"
                >{{allData.cost.paymentTime}}</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:87pt"
            >
              <p style="line-height:12.95pt; margin:0pt 12pt 0pt 0pt; text-align:right">
                <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:30pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="line-height:12.95pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">。</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:90pt; border:none"></td>
            <td style="width:18pt; border:none"></td>
            <td style="width:21pt; border:none"></td>
            <td style="width:45pt; border:none"></td>
            <td style="width:42pt; border:none"></td>
            <td style="width:30pt; border:none"></td>
            <td style="width:12pt; border:none"></td>
          </tr>
        </table>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:14.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 5pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">8</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page9"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线 12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:1.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十二条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">人身意外伤害保险</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1.出境社提示旅游者购买人身意外伤害保险；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.旅游者可以做以下选择： 3</span>
          <span style="font-family:宋体; font-size:12pt; text-decoration:underline"></span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt 1pt 0pt 0pt; text-indent:40.65pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.委托出境社购买（出境社不具有保险兼业代理资格的）：保险产品名称 （投保的相关信息以实际保单为准）；</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 0pt 0pt 42pt">
          <span style="font-family:宋体; font-size:12pt">2.自行购买；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 41pt">
          <span style="font-family:宋体; font-size:12pt">3.放弃购买；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 41pt">
          <span style="font-family:宋体; font-size:12pt">4.同意旅行社赠送人身意外保险。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十三条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">成团人数与不成团的约定</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 23pt">
          <span style="font-family:宋体; font-size:12pt">成团的最低人数：</span>
          <span
            style="width:16pt; text-indent:0pt; font-family:'Lucida Console'; font-size:10pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:135pt"
          >{{allData.groupAgreement.leastCustomerNumber}}</span>
          <span style="font-family:宋体; font-size:11.5pt; text-decoration:underline"></span>
          <span style="font-family:宋体; font-size:11.5pt">人。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">如不能成团，旅游者按以下第</span>
          <span
            style="width:17pt; text-indent:0pt; font-family:'Lucida Console'; font-size:10pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:197pt"
          >{{allData.groupAgreement.resolution}}</span>
          <span style="font-family:宋体; font-size:12pt">方式解决：</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 0pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >1.出境社委托{{allData.groupAgreement.transferToCompanyName}}</span>
          <span
            style="width:17pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:113pt"
          ></span>
          <span style="font-family:宋体; font-size:11.5pt">出境社履行合同；</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.延期出团；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3.改签其他线路出团；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4.解除合同。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十四条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">拼团约定</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">旅游者：</span>
          <span
            style="font-family:宋体; font-size:12pt; ;border-bottom:1px solid #000;"
          >{{allData.groupAgreement?'同意':"不同意"}}</span>
          <span style="font-family:宋体; font-size:12pt">
            （同意或者不同意，打勾无效）采用拼团方式拼至
            <span
              style="border-bottom:1px solid #000;"
            >{{allData.groupAgreement.mergeToCompanyName}}</span>出境社成团。
          </span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十五条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">自愿购物和参加另行付费旅游项目约定</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1.旅游者可以自主决定是否参加出境社安排的购物活动、另行付费旅游项目；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >2.出境社可以在不以不合理的低价组织旅游活动、不诱骗旅游者、不获取回扣等不正当利益，且不影响其他旅游者行程安排的前提下，按照平等自愿、诚实信用的原则，与旅游者协商一致达成购物活动、另行付费旅游项目协议；</span>
        </p>
        <p style="line-height:0.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3.购物活动、另行付费旅游项目安排应不与《行程单》冲突；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.05pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >4.地接社及其从业人员在行程中安排购物活动、另行付费旅游项目的，责任由订立本合同的出境社承担；</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <ol start="5" type="1" style="margin:0pt; padding-left:0pt">
          <li
            style="font-family:宋体; font-size:12pt; line-height:13.05pt; list-style-position:inside; margin:0pt; text-indent:24pt"
          >
            <span style="font:7.0pt 'Times New Roman'"></span>
            <span
              style="font-family:宋体; font-size:12pt"
            >购物活动、另行付费旅游项目具体约定见《自愿购物活动补充协议》、《自愿参加另行付费旅游项目补充协议》。</span>
          </li>
        </ol>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十六条 争议的解决方式</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.3pt; margin:0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >本合同履行过程中发生争议，由双方协商解决，亦可向合同签订地的旅游质监执法机构、消费者协会、有关的调解组织等有关部门或者机构申请调解。协商或者调解不成的，按下列第</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">种方式解决：</span>
        </p>
        <p style="line-height:0.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1.提交</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">{{allData.dispute.tribunalName}}</span>
          <span style="font-family:宋体; font-size:11.5pt">仲裁委员会仲裁；</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2.依法向人民法院起诉。</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十七条 其他约定事项</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 42pt">
          <span style="font-family:宋体; font-size:12pt">未尽事宜，经旅游者和出境社双方协商一致，可以列入补充条款。</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 42pt">
          <span style="font-family:宋体; font-size:12pt">{{allData.supplementaryClause}}</span>
        </p>
        <p style="line-height:0.1pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 42pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:0.05pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:12.35pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">第二十八条 合同效力</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">本合同一式 2 份，双方各持 1 份，具有同等法律效力，自双方当事人签字或者盖章之日起生</span>
        </p>
        <p style="line-height:0.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">效。</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="text-align:center">游客名单表</p>
        <el-table :data="allData.touristsInfo.tourists" border style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="ID.IDNumber" label="证件号码"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <!-- <el-table-column
                            label="民族">
                            </el-table-column>
                            <el-table-column
                            label="是否儿童">
          </el-table-column>-->
          <el-table-column prop="phone" label="手机号"></el-table-column>
        </el-table>

        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">10</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <!-- 自愿购物活动补充协议 -->
     <div>
        <p style="text-align: center">自愿购物活动补充协议</p>
         <el-table :data="allData.shoppings" border style="width: 100%">
          <el-table-column prop="date" label="具体时间" width="180"></el-table-column>
          <el-table-column prop="place" label="地点"></el-table-column>
          <el-table-column prop="shoppingPlace" label="购物场所名称"></el-table-column>
         
          <el-table-column prop="goods" label="主要商品信息"></el-table-column>
          <el-table-column  prop="stayDuration" label="最长停留时间其他说明（分钟）"></el-table-column>
          <el-table-column  prop="memo"  label="其他说明"> </el-table-column>

        </el-table>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:18.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">11</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <!-- 自愿参加另行付费旅游项目补充协议 -->
      <div>
         <p style="text-align: center">自愿参加另行付费旅游项目补充协议</p>
         <el-table :data="allData.activities" border style="width: 100%">
          <el-table-column prop="date" label="具体时间" width="180"></el-table-column>
          <el-table-column prop="place" label="地点"></el-table-column>
          <el-table-column prop="item" label="项目名称和内容"></el-table-column>
          <el-table-column prop="fee" label="费用（元）"></el-table-column>
          <el-table-column prop="stayDuration" label="项目时长（分钟）"></el-table-column>
           <el-table-column prop='memo' label="其他信息"></el-table-column>
        </el-table>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>

        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:18.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">1</span>
          <span style="font-family:宋体; font-size:9pt">2</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">

      <div>
        <p style="line-height: 30pt">团号：{{allData.itinerary?allData.itinerary.groupId:''}}</p>
        <p style="line-height: 30pt">线路名称：{{allData.itinerary?allData.itinerary.routeName:""}}</p>
        <el-table :data="allData.itinerary?allData.itinerary.routes:[]" border style="width: 100%">
          <el-table-column prop="day" label="天数"></el-table-column>
          <el-table-column prop="arrival.city" label="前往城市"></el-table-column>
          <el-table-column prop="description" label="行程描述" width="400"></el-table-column>
        </el-table>
      </div>

      <div>
        <p style="margin:0pt">
          <a name="page13"></a>
          <span style="font-family:'Times New Roman'; font-size:11pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.35pt; margin:0pt">
          <a name="page15"></a>
          <span style="font-family:宋体; font-size:10.5pt">附件</span>
          <span style="font-family:Calibri; font-size:10.5pt">1</span>
          <span style="font-family:宋体; font-size:10.5pt">：</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">8/12</span>
        </p>
        <p style="line-height:3.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">安全告知书</span>
        </p>
        <p style="line-height:4.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">尊敬的游客</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
        </p>
        <p style="line-height:1.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">您好</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
          <span style="font-family:宋体; font-size:10.5pt">感谢您选择（旅行社）为您提供出游服务</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
          <span style="font-family:宋体; font-size:10.5pt">为了确保您旅行安全和顺畅，请仔细阅读这份我们特别为您提供的旅行</span>
          <span style="font-family:Calibri; font-size:10.5pt">«</span>
        </p>
        <p style="line-height:1.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">安全告知书</span>
          <span style="font-family:Calibri; font-size:10.5pt">»</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >。此外，亦请您细心留意行程中领队或导游的友情提示及各地旅游设施的安全告知、口头告知，以避免不必</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">要的人身损害和财产损失，预祝您旅行愉快</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">一、参团注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、根据自身情况，谨慎选择旅游线路及项目</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >请您在充分了解旅途的辛苦和行程中医疗条件有限的前提下，确定自己的身体健康状况适合参加本次旅游活动后方可报名</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >参团，如因个人既有病史和身体残障在旅游行程中引起的疾病进一步发作和伤亡，旅行社将不承担任何责任。现有的旅游</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >意外险条款中，此种情况也为保险公司的免赔范围，旅行社为非健康医疗专业咨询机构，无法准确判定游客的身体健康状</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >况是否适合参加本次旅游活动。游客在旅行社签订旅游合同，即视为游客已经了解本次旅行的辛苦程度和行程中医疗条件</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">有限的前提，并征得专业医生的同意。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">２、特殊人群参团，特别注意事项</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.9pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">特殊人群参团，应签署</span>
          <span style="font-family:Calibri; font-size:10.5pt">«</span>
          <span style="font-family:宋体; font-size:10.5pt">旅游者健康状况确认书</span>
          <span style="font-family:Calibri; font-size:10.5pt">»</span>
          <span style="font-family:宋体; font-size:10.5pt">或</span>
          <span style="font-family:Calibri; font-size:10.5pt">«</span>
          <span style="font-family:宋体; font-size:10.5pt">参团承诺书</span>
          <span style="font-family:Calibri; font-size:10.5pt">»</span>
          <span style="font-family:宋体; font-size:10.5pt">游客出现急症请主动通知工作人员，旅行社将协</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">助游客就近送往当地医疗机构检查治疗。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">未成年人保护</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >旅行社不接受未满十八周岁、不具备完全民事行为能力的未成年人单独参团，未成年人必须有成年直系</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >亲属陪伴方可参团，一起报名参团的成人即为其参团过程中的监护人，有责任和义务做好未成年人的安全防范工作。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 有听力、视力、行动障碍的游客须有健康旅伴陪同方可参团。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 个人有精神疾病和无行为控制能力的不能报名参团。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 身体健康状况欠佳者，请咨询医生是否可以参加本次旅游活动，根据自身情况备好常用药和急救药品。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 因自身疾病而引发的后果，游客自行承担责任。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">二、出团前准备事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、特殊气候地理条件，防护措施非常必要</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 出发前请充分了解当地的气候、气温，旅游顾问或领队会在出行前向您介绍当地气候、</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">气温等，请按旅游顾问或领队的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">建议准备相应物品。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 不同的地区气候多变，如果您的旅途涉及热带、高原、海滨、草原等特殊的气候、地理条件，请注意采取必要的防护措</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >施，做好防晒、防蚊虫、防高原反应等准备工作。老年人、儿童及体弱者等易感冒人群，应当备足适宜的衣物，以便随时</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >增减，出行应穿旅游鞋或软底防滑鞋，携带相应的用品，如雨伞、遮阳帽、墨镜等。上年纪的人带上手杖。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page16"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 由于某些地区或旅游项目只有穿长袖衣裤才适合，因此长短袖衣裤均必不可少。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">2</span>
          <span style="font-family:宋体; font-size:10.5pt">、提前检查身体，自行备足药品</span>
        </p>
        <p style="line-height:4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 临行前应确保身体健康，如有体质较弱或者曾患病者必须坚持治疗，防止旧病复发。如游客有长期用药的需求，出团前</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">请告诉旅行社，以便领队、导游在行程中可提醒您按时服药。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 为防止水土不服或意外，请自行备足常用及急救药品，如创可贴 感冒药、 晕车药、 止泻药、消炎药、风油精、健胃</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">药、抗过敏药等。领队导游不能给您提供任何药品且无权提供用药建议。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 患有心脏病、高血压、恐高症、精神病、孕妇及行动不能自理、自控的客人和患有疾病、残疾等或以赛事为主的人员不</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">建议出行。但是如果自身认为有参团条件。请自觉不要参与对自己身体不适宜的活动。不参</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">与需要大量消耗体力或有可能</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">对特殊体质产生影响的活动。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">３、了解护照及签证事宜，保证顺利出行</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">有效身份证件</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >游客出发时必须携带有效身份证件。参加国内旅游时须携带有效期内的身份证。出境游须带齐护照或通</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >行证原件。如因个人原因没有携带有效身份证件造成无法办理入住或出境手续造成的损失，游客自行承担责任。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 因公护照不能参团，报名时请您携带因私护照参团。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 持香港护照的游客须自行携带回乡证，外籍游客及签证自理的游客请您自行携带在有效</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">期内的护照及返回中国的有效签</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">证及相关证件。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 有些国家对护照或签证有特殊要求，旅行社将向游客详细讲解。请您注意，如巴厘岛要</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">求出团时游客自行携带护照原</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">件，外籍游客自理签证。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">三、行程中注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、出发当天，准时集合</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">认真阅读出团通知</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">行程单</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">务必在规定的时间内到达指定的地点，安排好从家中到集合地点的路线和交通工具，并携带相</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12.7pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">关票证</span>
          <span style="font-family:Calibri; font-size:10pt">(</span>
          <span style="font-family:宋体; font-size:10pt">从外地前往集合地点的游客建议提前一天抵达</span>
          <span style="font-family:Calibri; font-size:10pt">)</span>
          <span style="font-family:宋体; font-size:10pt">。如因自身原因造成无法登机或延误，</span>
        </p>
        <p style="line-height:3.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">一切损失需要您自行承担。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">２、贵重物品，妥善保管</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >证件和贵重物品，如护照、身份证、机票、现金、支票、银行卡、邀请函原件和复印件等，请务必随身携带，一定不要放</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >在托运的行李中。如因放入托运的行李中而丢失的，旅行社不承担责任。仅负有协助您向航空公司索赔的义务。有些国家</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.9pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >或地区对入境安检有特殊要求，请您按照旅行社的讲解进行操作，以免造成不必要的麻烦或损失。例如前往北美地区</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">美</span>
        </p>
        <p style="line-height:1.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">国、加拿大</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">旅游，行李箱请勿上锁，否则会被划开检查。</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">３、在交通工具上注意事项</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 如您需在飞机上调整座位，应在飞机起飞且平稳后协商调换。切不可挡住通道，影响其他客人通行。调换位置后，请不</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">要与对方更换登机牌，否则会影响销签事宜。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 出外旅游携带的行李要求轻便旅行箱、包要坚固耐用。应尽量避免携带贵重物品。行李</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page17"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">如需托运，切勿将现金及贵重物</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">品放在托运行李中。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 搭乘飞机时请您扣好安全带，不要在飞机上使用手提移动电话等相关电子品。不要在飞机上随意走动</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 乘机、坐车、上船时要注意扶梯，在台阶处站稳，乘车时扣好安全带，注意颠簸路段及司机急刹车以免扭伤或摔伤身</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >体，行车途中不要在车内走动、追逐嬉戏。老人和儿童要有成年人陪护，年龄比较小的最好是有成年人抱在怀中。以免在</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">紧急制动时发生危险。车辆在颠簸路段行驶过程中请不要喝水或吃东西</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">主要是坚果类</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">以免发生呛水或卡咽等危险情况。</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">在车上、船上开窗通风时，不得把身体伸向窗外，以免发生危险。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 有晕车、晕船、高血压、心脏病病症的客人，请提前服用有效的药物。在旅途中若是有</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">不舒服的症状，请及时告诉领队</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">或导游。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">乘坐交通工具</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">如火车、轮船、巴士、游轮等</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">抵达目的地后，注意检查随身行李和物品，避免遗忘物品。若因自身注意</span>
        </p>
        <p style="line-height:3.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">不够导致丢失的，责任由您自行承担。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">４、酒店注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●入住宾馆后请仔细阅读住宿须知，爱护宾馆内的各种物品，损坏照价赔偿。同时请保管好</span>
        </p>
        <p style="line-height:4.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">房卡或钥匙检查房间内设施</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">卫</span>
        </p>
        <p style="line-height:1.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">浴设备、遥控器、烟缸、毛巾浴巾等</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">是否有损坏并及时告知酒店，以免退房时发生不必要的麻烦。</span>
          <span style="font-family:Calibri; font-size:10.5pt">9/12</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 在使用房间内物品时，看清是否是免费使用的，如使用非免费物品请看清标价。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 请勿在房间内大声喧哗，乱涂乱写乱倒垃圾。不要在床上吸烟和饮酒，禁止在屋內燃烧</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">任何东西，有事与服务员和领队</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">联系。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 沐浴时应把浴帘拉好，防止洗澡水外溢至卫生间外。同时地面、浴缸容易打滑，一定要先把防滑垫放好以防滑倒摔伤。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 如遇雨雪天气，进入酒店大堂时或上下酒店楼梯时容易滑倒，务必注意脚下防滑</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 出入酒店房间请随手关门并把门窗锁好，不要随便开门或让陌生人进入房间以免上当受骗。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 请妥善保管好自己的财物，贵重物品及有效证件要随身携带或申请酒店的保险柜服务。不要将贵重物品及证件放入托运</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">的行李、住宿的房间里以及游轮上、船上房间内。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 每次退房前，请检查您所携带的行李物品，特别注意您的证件和贵重物品。</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">● 应留意酒店内附属设施的开放时间及使用规则，请勿在酒店泳池闭馆时间私自下池戏水。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 有些国家地区的酒店内不允许在房间内食榴莲等异味较大、山竹等果皮颜色和果汁颜色</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">较深的水果，否则会被处以罚</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">款。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 您在酒店使用热水壶、电吹风等小电器时要了解当地电压、酒店电线线路等，并按照产品使用说明操作，以免短路损坏</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">酒店设施，酒店将要求游客照价赔偿。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">５、景区注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0.3pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:10.5pt">● 抵达景区游览前，请您谨记领队或导游交代的集合地点、时间、所乘游览车号。万一走</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page18"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">失请于集合地点等候导游返回寻</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">找。</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">●团体旅行时不可擅自脱队，单独离队，随身应携带当地住宿饭店地址、领队及导游电话。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">以免发生意外。参加团队旅</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >游，要听从领队或导游的指挥安排，不随意活动，以免发生离群、掉队、迷路等事件。要随时注意团队的去向，以免掉</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >队。旅行期间，团友应互敬互谅，配合领队和导游工作。如有违法或者违规行为，领队和导游有权制止或采取相应措施。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 行程中或自由活动时不参加危险活动项目，如攀岩、漂流、冲浪、高速摩托艇、水上飞机、高速游轮、潜水艇等项目。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >如执意参加，要听从该处工作人员的安排。落实各项安全措施，切忌麻痹大意。带儿童的游客，参加此类活动应照顾好自</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >己的孩子，不要让他们独自活动。身体状况不佳者请勿参加。患有心脏病、肺病、哮喘病、高血压、恐高症者切忌从事水</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">上、高空活动。如有意外发生，我社不承担责任。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 因无法预测水下状况、海啸、台风、海蜇、海胆、水母、鲨鱼、珊瑚、溺水等等意外的发生，旅行社不组织游客参加游</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >泳、潜水等水上或下水项目。如游客执意下水也需根据自身情况仔细斟酌后再下水。同时避免到无人清理或深海里游泳。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >不熟悉水性者，切勿独自下水。 儿童一定要有家长陪同一起游玩，如有意外发生，我社不承担责任。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 搭乘快艇、游船、漂流木筏，参加水上活动，请按规定穿着救生衣，并遵照工作人员的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">指导。如有晕水、晕船者请勿游</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">玩水上项目。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 60.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 游客在乘坐缆车、直升机或其它高空项目时，一定要注意安全，系好安全带。６、游轮旅游注意事项</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.9pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">自备药物</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >如果您有平时惯用或长期服用的药物，请不要忘记携带，比如抗高血压、心脏病、胃病或糖尿病等方面的药</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >品。如果所经海域风浪较大，有时可能会出现晕船，即使您的身体非常健康，也建议您携带一些常备药品以备应急之需，</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">如感冒药、晕车药、 抗过敏药、腹泻药、创可贴等。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 16.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">包船岸上观光游</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >由于签证原因，所有游客必须在国内提前选择全程的岸上观光游套餐，如果由于特殊原因不能下船游</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >览，请您提前通知领队，按照船方规定来办理相关的入境盖章业务。行程确认之后不能取消，费用不退，然后按照您报名</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">参加的线路于通知的时间和地点集合下船游览。如遇天气原因邮轮无法正常靠岸，导致岸上</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">观光游被迫取消，属于不可抗</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">力，按照合同约定费用不退。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">自行参加邮轮公司的岸上观光游</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span style="font-family:宋体; font-size:10.5pt">游客在邮轮上自愿选择邮轮公司组织的岸上观光 有关行程、购物等安排以邮轮公司安</span>
        </p>
        <p style="line-height:3.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">排为准。由此产生的问题也和邮轮公司沟通联系，旅行社不承担任何连带责任。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 16.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">有关证件</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >请您务必随身携带有效期半年以上的护照原件，如果您持有的是港澳台护照，请您务必随身携带回乡证。如果</span>
        </p>
        <p style="line-height:3.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">您持有的是外籍护照一定要有多次往返中国签证，以便办理相关手续。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.85pt; margin:0pt">
          <a name="page19"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">有关行李托运</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >现金、证件或贵重物品须随身携带，不应放进托运行李内，也不应在外出时留在房间。船方禁止游客自行</span>
        </p>
        <p style="line-height:5.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >携带酒类上船，请不要将酒放于行李中。以免造成行李被扣留延误登船，严禁托运携带任何危险物品或刀具。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">救生演习</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >根据国际海事公约所有客轮上游客及船员于启航前必须进行安全演习，请您留意船上广播而所有客舱内均放置</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">有救生指南。客舱门后亦贴有救生通告指引，请您仔细阅读有关内容。</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">安全管理</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >因检疫要求，陆上水果与蔬菜请勿带上船。船上的水果与蔬菜类亦请勿携带登岸。同时根据国际法规定，在返</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">回登船前，您必须经过安全检查。</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">邮轮结束前准备</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >离船前一夜，船方会通知游客结账的时间和地点。结账时会给游客一份私人消费账单，请仔细对帐，核</span>
        </p>
        <p style="line-height:5.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >对无误后可以现金或者信用卡结账。结账后可领回护照，船卡仍能刷卡消费，但是以免下船前再次结账耽误时间，请结账</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 328.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">后最好不要再消费。７、饮食卫生注意事项</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >旅行中请注意卫生安全。传染病、流行病等。时时刻刻注意防治，餐前先洗手，不食用不卫生、不合格的食品和饮料。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">因个人信仰、口味要求不同。若有特殊要求应提前向旅行社说明。以便导游更好的为您安排饮食。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >在外旅游时请重视饮食卫生。严防“病从口入”。不吃不洁和生冷食品，不采摘食用路边蔬果。对各地的风味小吃、土</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">特产食品应以品尝为主，一次不宜吃得太多。更不能暴饮暴食。以免引起消化不良等。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 34pt; text-indent:-16pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">多吃些新鲜蔬菜和水果，少食油腻和辛辣生冷食物，最好少饮或不饮酒。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >吃海鲜应选择新鲜的海鲜，吃海鲜不宜饮啤酒、不宜与某些水果同吃，且吃海鲜后不要马上去游泳。对海鲜过敏的游客</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">请禁食海鲜，以免引起过敏乃至中毒反应。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 81.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >各地水质略有不同，可能产生水土不服、拉肚子的情况。建议饮用瓶装水、风俗习惯、宗教礼仪注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 34pt; text-indent:-16pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">到达目的地国家后请您入乡随俗，尊重当地的风俗习惯。</span>
        </p>
        <p style="line-height:4.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 34pt; text-indent:-16pt">
          <span style="font-family:宋体; font-size:10pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10pt">前往宗教场所时请您特别注意当地的礼仪，避免因不了解宗教习俗而产生宗教误解及冲</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">突。</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 21.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">Ａ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">进入基督教教堂需脱帽和摘下墨镜，男士不能穿短裤，保持安静，穿着不能过于暴露。Ｂ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">犹太教场所需带帽子进入。</span>
        </p>
        <p style="line-height:1.75pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">Ｃ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">进入伊斯兰教场所需准许并要脱鞋，女士需要戴上面纱才可进入。</span>
        </p>
        <p style="line-height:2.25pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 94.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">Ｄ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">进入泰国寺庙，女士不可穿裙子进入，进门前要脱鞋，不能脚踏门槛。四、特别安全提示</span>
        </p>
        <p style="line-height:5.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >自由活动期间应谨慎行为，加强自我保护。在旅游者自行安排活动期间，旅行社仅负有安全提示、救助义务。除此以外，</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 213.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">旅行社对旅游者的人身、财产损失不承担责任。１、切忌单独外出 谨慎参加高风险活动</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >自行安排活动期间，包括在我社安排的旅游行程中独立的自由活动期间、旅游者不参加旅游行程的活动期间及在经导游</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">或领队同意暂时离队的个人活动期间，请您时刻注意人身及财产安全，切忌单独外出，外出</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page20"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">时应当至少保持两三人一起活</span>
        </p>
        <p style="line-height:3.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">10/12</span>
        </p>
        <p style="line-height:3.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">动。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 自行安排活动期间，谨慎选择自己能够控制风险的活动项目务必充分了解活动的内容并严格遵守活动项目的安全规定，</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >根据自身身体情况决定运动时间、运动量，避免意外事件的发生。活动前要了解具体的活动常识、活动范围、活动方法等</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >相关规定、注意事项。选择适合自己的项目，活动前检查好各种器械，注意安全，服从指导人员的指挥 特别是患有心脏</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >病、高血压、恐高症等不宜参加剧烈或激烈活动的旅游者，不要选择与自身身体情况不相适应的活动，以免发生不测。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 不建议您参加高风险活动，如直升机、热气球、滑雪、滑草、滑沙、潜水、漂流、游泳等。坚决不参加吉普车越野、摩</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">托车驾驶、自驾车、蹦极、水上摩托、滑翔伞、冲浪、探险等高风险项目。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 游泳及潜水入水前请确认身体状况适合游泳。没有影响身体机能的慢性病及心脏病 入水前严禁暴饮暴食及空腹下水，</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >杜绝单独下水。游泳时应有身强体壮或有照应能力的同伴跟随，因个人体质不同可能会出现晒伤及光过敏，请客人自己考</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >量并自行承担晒伤后果。如在境外参加潜水，浮潜等活动前，请确保自己会游泳及会使用潜水设备。如有外籍教练进行活</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">动前培训，应确保能够正确理解教练的一切意图，否则不要参加此项活动。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">五、其它注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、维护国家形象，文明出行，妥善言行</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 中国是文明古国，请在外旅游时请做到礼貌待人、公共场所不大声喧哗、吸烟。不随地吐痰、乱扔废弃物。不在景点乱</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >写乱画，带孩子的家长要关照孩子，不要在严禁嬉戏的公共场所内随意嬉戏，叫喊，乱跑，不私自燃放烟花炮竹，车上、</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >船上不吃水果及瓜子等带皮食品，不食用冰激凌汉堡包等。否则当地司机有可能不开车或者不准许客人上车。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 用餐时切记请勿大声喧哗、敲打餐具、划拳行令，取菜、饭，应顾全大局。如用自助餐应切记浪费，请吃完自己盘内食</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 55.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >物后再次拿取，如果将自己喜好的餐食，全部划为己有，是不礼貌和自私的行为。２、听从安排，意外事件发生时不要慌张</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 因自然原因和社会原因引起的不可抗力事件，如自然灾害、战争、罢工、重大传染性疫情、政府行为等，或影响旅行行</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >程的列车和航班等公共交通工具的延误或取消、恶劣天气变化、交通堵塞、重大礼宾活动等事件，旅行社不承担赔偿责</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >任，但会积极采取补救措施减少您的损失，如影响行程或服务标准的，无论情况是否紧急，请您千万不要慌张，镇定判断</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >情况，注意当地的预警报告，提高自我保护意识，服从有关部门的指挥 配合旅行社对此采取的补救措施和相关调整。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >● 在旅行过程中如您发生被抢、被盗、突发急症等情况，旅行社有协助您报案或送医院救治的义务，但旅行社不是行政和</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0.3pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:10pt">医疗机构，无法要求警察局和医院必须执行何种的处理方法。因此产生的所有费用均需要您</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page21"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">自行支付，请您保留好所有的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">原始单据，如在保险范围内的，可以通过保险降低损失。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 如在旅游过程中遇当地发生暴动、政变、游街示威、罢工等，请勿围观或参与。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">● 我们希望您在行程出发前，购买适合自己行程活动的旅游意外保险。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">最后，衷心祝愿您的旅途平安、健康、顺利、愉快</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
        <p style="line-height:2.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">以上内容请仔细阅读后签字确认，谢谢您的合作</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">本人已阅读并完全理解上述参团须知及安全提示，并对自己的人身及财物安全负责。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.85pt; margin:0pt">
          <a name="page22"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">附件</span>
          <span style="font-family:Calibri; font-size:10.5pt">2.</span>
          <span style="font-family:宋体; font-size:10.5pt">文明旅游倡议书</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">全体市民和旅游行业从业者：</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >旅游是一项发现美、欣赏美、享受美的活动，更是一项创造美的活动。市民在旅游活动中的一言一行，不仅体现了个</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">人的文明水平，更是一个城市文明程度的主要体现和重要标志。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >崇义是中国最受游客喜爱的地方，更需要文明旅游。拒绝“到此一游”，倡导文明旅游，是建设转型城市的道德支</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">撑。为此，我们向全县旅游行业和全体市民发出如下倡议：</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">一、加强学习，提高文明旅游素质</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >认真学习公民基本道德规范，学习文明礼仪，严格遵守《中国公民国内旅游行为公约》，切实掌握《中国公民出国</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">（境）旅游文明行为指南》</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">要识别不文明行为的各种表现，明辨旅游活动中的是非、美丑，不断提升思想道德境界。</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">二、加强管理，营造文明旅游环境</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">文明管理、文明执法、文明服务，杜绝粗暴执法、不规范服务等行为</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">规范经营行为，杜绝出售假冒伪劣商品，文明经</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 45.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >营，诚信服务。要营造文明旅游的环境，使广大游客在旅游活动中，提升文明素养。三、积极参与，塑造文明旅游形象</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">市民在旅游活动中不随地吐痰，不乱扔废弃物，不在禁烟场所吸烟</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">遵守公共秩序，不在公众场所高声交谈</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">保护文物</span>
        </p>
        <p style="line-height:1.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">古迹，不在文物古迹上涂刻，拍照摄像遵守规定</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">对身边的不文明行为及时劝阻</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">不长时间占</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">用公共设施，尊重服务人员的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">劳动，尊重各地风俗习惯。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">文明旅游，从我做起，从现在做起</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
          <span style="font-family:宋体; font-size:10.5pt">希望全县旅游行业从业人员及广大市民，无论是在崇义，还是在外地，时刻把“文</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">明”记在心里，落实在行动中，因为你就代表着崇义</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page23"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">中国公民出境旅游文明行为指南</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.95pt; margin:0pt 207.3pt 0pt 18pt; text-align:justify">
          <span style="font-family:宋体; font-size:10.5pt">
            中国公民， 出境旅游， 注重礼仪， 保持尊严。讲究卫生， 爱护环境； 衣着得体， 请勿喧哗。尊老爱幼， 助人为乐； 女士优先， 礼貌谦让。出行办事， 遵守时间； 排队有序， 不越黄线。文明住宿， 不损用品； 安静用餐， 请勿浪费。健康娱乐， 有益身心； 赌博色情， 坚决拒绝。参观游览， 遵守规定； 习俗禁忌，
            切勿冒犯。遇有疑难， 咨询领馆； 文明出行， 一路平安
          </span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.4pt; margin:0pt">
          <a name="page24"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:27.4pt; margin:0pt 0pt 0pt 54pt">
          <span style="font-family:宋体; font-size:24pt">《中国公民国内旅游文明协议书》</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 0pt 0pt 60pt">
          <span style="font-family:宋体; font-size:14pt">营造文明、和谐的旅游环境，关系到每位游客的切身利益。</span>
        </p>
        <p style="line-height:2.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:14pt">做文明游客是我们大家的义务，请遵守以下公约：</span>
        </p>
        <p style="line-height:14.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">1、维护环境卫生。不随地吐痰和口香糖，不乱扔废弃物，不在禁烟场所吸烟。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">2、遵守公共秩序。不喧哗吵闹，排队遵守秩序，不并行挡道，不在公众场所高声交谈。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 6.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">3、保护生态环境。不踩踏绿地，不摘折花木和果 实，不追捉、投打、乱喂动物。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">4、保护文物古迹。不在文物古迹上涂刻，不攀爬触摸文物，拍照摄像遵守规定。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">5、爱惜公共设施。不污损客房用品，不损坏公用设施，不贪占小便宜，节约用水用电，用餐不浪费。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span
            style="font-family:宋体; font-size:13.5pt"
          >6、尊重 别人权利。不强行和外宾合影，不对着别人打喷嚏，不长期占用公共设施，尊重服务人员的劳动，尊重各民族宗教习俗。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">7、讲究以礼待人。衣着整洁得体，不在公共场所袒胸赤膊；礼让老幼病残，礼让女士；不讲粗话。</span>
        </p>
        <p style="line-height:12.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 2.3pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:14pt">8、提倡健康娱乐。抵制封建迷信活动，拒绝黄、赌、毒。</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 0pt 0pt 279pt">
          <span style="font-family:宋体; font-size:14pt">中央文明办</span>
          <span
            style="width:13pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:362pt"
          ></span>
          <span style="font-family:宋体; font-size:14pt">国家旅游局</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.15pt; margin:0pt">
          <a name="page25"></a>
          <span style="font-family:宋体; font-size:11.5pt">全国统一旅游电子合同编号： {{allData.ERPContractId}}</span>
          <span
            style="width:160.5pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:379pt"
          ></span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:11.5pt">游客签字：</span>
          <span
            style="width:210.5pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:268pt"
          ></span>
          <span style="font-family:宋体; font-size:11.5pt">出境社盖章：</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt 0pt 0pt 88pt">
          <span style="color:#ffffff; font-family:宋体; font-size:11.5pt">USER_SIGN</span>
          <span
            style="width:239.25pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:379pt"
          ></span>
          <span style="color:#ffffff; font-family:宋体; font-size:11.5pt">AG_STAMP</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:6pt">
          <tr style="height:13.1pt">
            <td colspan="2" style="vertical-align:bottom; width:194pt">
              <p style="line-height:13.15pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">证件号码：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:193pt">
              <p style="line-height:13.15pt; margin:0pt 0pt 0pt 69pt">
                <span style="font-family:宋体; font-size:11.5pt">经办人：</span>
              </p>
            </td>
          </tr>
          <tr style="height:23.8pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:170pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:193pt">
              <p style="line-height:13.15pt; margin:0pt 0pt 0pt 69pt">
                <span style="color:#ffffff; font-family:宋体; font-size:11.5pt">AG_SIGN</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">住</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:170pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:11.5pt">址：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:193pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 69pt">
                <span style="font-family:宋体; font-size:11.5pt">营业地址：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td colspan="2" style="vertical-align:bottom; width:194pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">联系电话：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:193pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 69pt">
                <span style="font-family:宋体; font-size:11.5pt">联系电话：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">传</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:170pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:11.5pt">真：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:92pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 69pt">
                <span style="font-family:宋体; font-size:11.5pt">传</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:101pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 13pt">
                <span style="font-family:宋体; font-size:11.5pt">真：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">邮</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:170pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:11.5pt">编：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:92pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 69pt">
                <span style="font-family:宋体; font-size:11.5pt">邮</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:101pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 13pt">
                <span style="font-family:宋体; font-size:11.5pt">编：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td colspan="2" style="vertical-align:bottom; width:194pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">电子邮箱：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:193pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 69pt">
                <span style="font-family:宋体; font-size:11.5pt">电子邮箱：</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:24pt; border:none"></td>
            <td style="width:170pt; border:none"></td>
            <td style="width:92pt; border:none"></td>
            <td style="width:101pt; border:none"></td>
          </tr>
        </table>
        <p style="line-height:10.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:11.5pt">签约地点：</span>
        </p>
        <p style="line-height:10.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:11.5pt">全国旅游投诉服务热线：12301</span>
        </p>
      </div>
    </div>
    <div class="box" v-if="allData && Ctype == 1">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page1"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号:</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:14.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:29.7pt; margin:0pt 0pt 0pt 184pt">
          <span style="font-family:宋体; font-size:26pt; font-weight:bold">境内旅游合同</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:14pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">国</span>
          <span
            style="width:10pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:32pt"
          ></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">家</span>
          <span style="width:18pt; text-indent:0pt; display:inline-block"></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">旅</span>
          <span style="width:14pt; text-indent:0pt; display:inline-block"></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">游</span>
          <span style="width:14pt; text-indent:0pt; display:inline-block"></span>
          <span style="font-family:宋体; font-size:21.5pt; font-weight:bold">局</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 0pt 0pt 404pt">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">制定</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">国家工商行政管理总局</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:11.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 0pt 0pt 184pt">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">二〇一四年四月</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 0pt 0pt 259pt">
          <span style="font-family:宋体; font-size:9pt">1</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page2"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:25.1pt; margin:0pt 0pt 0pt 197pt">
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">使</span>
          <span
            style="width:21pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:240pt"
          ></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">用</span>
          <span
            style="width:22pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:284pt"
          ></span>
          <span style="font-family:宋体; font-size:22pt; font-weight:bold">说</span>
          <span
            style="width:22pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:328pt"
          ></span>
          <span style="font-family:宋体; font-size:21.5pt; font-weight:bold">明</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:18.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.9pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span style="font-family:宋体; font-size:15pt">1</span>
          <span
            style="font-family:宋体; font-size:15pt"
          >、本合同为示范文本，供中华人民共和国境内（不含港、澳、台地区）旅行社与旅游者之间签订团队境内包价旅游合同时使用（不含赴港、澳、台地区旅游及边境游）。</span>
        </p>
        <p style="line-height:4.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.2pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span style="font-family:宋体; font-size:15pt">2</span>
          <span
            style="font-family:宋体; font-size:15pt"
          >、双方当事人应当结合具体情况选择本合同协议条款中所提供的选择项，空格处应当以文字形式填写完整。</span>
        </p>
        <p style="line-height:4.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.2pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span style="font-family:宋体; font-size:15pt">3</span>
          <span
            style="font-family:宋体; font-size:15pt"
          >、双方当事人可以书面形式对本示范文本内容予以变更或者补充，但变更或者补充的内容，不得减轻或者免除应当由旅行社承担的责任。</span>
        </p>
        <p style="line-height:4.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:17.2pt; margin:0pt; text-align:justify; text-indent:30pt">
          <span style="font-family:宋体; font-size:15pt">4</span>
          <span style="font-family:宋体; font-size:15pt">、本示范文本由国家旅游局和国家工商行政管理总局共同制定、解释，在全国范围内推行使用。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:15.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">2</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:0pt">
          <tr style="height:13.7pt">
            <td colspan="5" style="vertical-align:bottom; width:283pt">
              <p style="line-height:13.7pt; margin:0pt 53pt 0pt 0pt; text-align:center">
                <a name="page3"></a>
                <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：{{allData.ERPContractId}}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:42pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:200pt">
              <p style="line-height:13.7pt; margin:0pt 23pt 0pt 0pt; text-align:right">
                <span style="color:#0d0d0d; font-family:宋体; font-size:12pt">国家旅游咨询投诉热线</span>
                <span style="color:#0d0d0d; font-family:宋体; font-size:12pt">12301</span>
              </p>
            </td>
          </tr>
          <tr style="height:2.7pt">
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:73pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:2pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:54pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:2pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:12pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:2pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:42pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:2pt">&#xa0;</span>
              </p>
            </td>
            <td
              colspan="2"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:144pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:2pt">&#xa0;</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:200pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:2pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:25.2pt">
            <td style="vertical-align:bottom; width:73pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:54pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="4" style="vertical-align:bottom; width:386pt">
              <p style="line-height:25.1pt; margin:0pt 168pt 0pt 0pt; text-align:right">
                <span style="font-family:宋体; font-size:22pt; font-weight:bold">团队境内旅游合同</span>
              </p>
            </td>
          </tr>
          <tr style="height:34.8pt">
            <td style="vertical-align:bottom; width:90pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
                <span style="font-family:宋体; font-size:12pt">旅游者：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:66pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 6pt; text-align:center">
                <span style="font-family:宋体; font-size:12pt"></span>
                <span
                  style="font-family:宋体; font-size:12pt"
                >{{allData.touristsInfo.tourists[0].name}}</span>
                <span style="font-family:宋体; font-size:12pt"></span>
                <span style="font-family:宋体; font-size:12pt">等</span>
              </p>
            </td>
            <td colspan="4" style="vertical-align:bottom; width:386pt">
              <p style="line-height:13.7pt; margin:0pt 26pt 0pt 0pt; text-align:right">
                <span style="font-family:宋体; font-size:12pt">{{allData.touristsInfo.totalNumber}}</span>
                <span style="font-family:宋体; font-size:12pt">人（名单可附页，需旅行社和旅游者代表签字盖章确认）；</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:73pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:54pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:42pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:102pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:42pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:200pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.55pt">
            <td style="vertical-align:bottom; width:73pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
                <span style="font-family:宋体; font-size:12pt">旅行社：</span>
              </p>
            </td>
            <td
              colspan="4"
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:210pt"
            >
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">盈科美辰国际旅行社有限公司</span>
              </p>
            </td>
            <td
              style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1pt; vertical-align:bottom; width:42pt"
            >
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:200pt">
              <p style="line-height:13.7pt; margin:0pt 182pt 0pt 0pt; text-align:right">
                <span style="font-family:宋体; font-size:12pt">；</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.55pt">
            <td colspan="5" style="vertical-align:bottom; width:283pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
                <span style="font-family:宋体; font-size:12pt">旅行社业务经营许可证编号：</span>
                <span style="font-family:宋体; font-size:12pt">L-BJ-CJ00423</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:242pt">
              <p style="line-height:13.7pt; margin:0pt 224pt 0pt 0pt; text-align:right">
                <span style="font-family:宋体; font-size:12pt">。</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:73pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt"></span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:54pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:42pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:102pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:42pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:200pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:73pt; border:none"></td>
            <td style="width:54pt; border:none"></td>
            <td style="width:12pt; border:none"></td>
            <td style="width:42pt; border:none"></td>
            <td style="width:102pt; border:none"></td>
            <td style="width:42pt; border:none"></td>
            <td style="width:200pt; border:none"></td>
          </tr>
        </table>
        <p style="line-height:17.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第一章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:72pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">术语和定义</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第一条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:72pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">本合同术语和定义</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 1pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、团队境内旅游服务，指旅行社依据《中华人民共和国旅游法》、《旅行社条例》等法律、法规，组织旅游者在中华人民共和国境内（不含香港、澳门、台湾地区）旅游，代订公共交通客票，提供餐饮、住宿、游览等两项以上服务活动。</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、旅游费用，指旅游者支付给旅行社，用于购买本合同约定的旅游服务的费用。</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">旅游费用包括：</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(1)</span>
          <span style="font-family:宋体; font-size:12pt">交通费；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(2)</span>
          <span style="font-family:宋体; font-size:12pt">住宿费；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(3)</span>
          <span style="font-family:宋体; font-size:12pt">餐费（不含酒水费）；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(4)</span>
          <span style="font-family:宋体; font-size:12pt">旅行社统一安排的景区景点门票费；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(5)</span>
          <span style="font-family:宋体; font-size:12pt">行程中安排的其他项目费用；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(6)</span>
          <span style="font-family:宋体; font-size:12pt">导游服务费；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(7)</span>
          <span style="font-family:宋体; font-size:12pt">旅行社（含地接社）的其他服务费用。</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">旅游费用不包括：</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">(1)</span>
          <span style="font-family:宋体; font-size:12pt">旅游者投保的人身意外伤害保险费用；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 1pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">(2)</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >合同未约定由旅行社支付的费用，包括但不限于行程以外非合同约定活动项目所需的费用、自行安排活动期间发生的费用；</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 1pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">(3)</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >行程中发生的旅游者个人费用，包括但不限于交通工具上的非免费餐饮费、行李超重费，住宿期间的洗衣、电话、饮料及酒类费，个人娱乐费用，个人伤病医疗费，寻找个人遗失物品的费用及报酬，个人原因造成的赔偿费用。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 0pt 0pt 1pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、履行辅助人，指与旅行社存在合同关系，协助其履行本合同义务，实际提供相关服务的法人、自然人或者其他组织。</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">、自由活动，特指《旅游行程单》中安排的自由活动。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 1pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、自行安排活动期间，指《旅游行程单》中安排的自由活动期间、旅游者不参加旅游行程活动期间、每日行程开始前、结束后旅游者离开住宿设施的个人活动</span>
          <span style="font-family:宋体; font-size:12pt">期间、旅游者经导游同意暂时离团的个人活动期间。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 0pt 0pt 1pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、不合理的低价，指旅行社提供服务的价格低于接待和服务费用或者低于行业公认的合理价格，且无正当理由和充分证据证明该价格的合理性。其中，接待和服务费用主要包括旅行社提供或者采购餐饮、住宿、交通、游览、导游等服务所支出的费用。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.7pt; margin:0pt 12pt 0pt 1pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、具体购物场所，指购物场所有独立的商号以及相对清晰、封闭、独立的经营边界和明确的经营主体，包括免税店，大型购物商场，前店后厂的购物场所，景区内购物场所，景区周边或者通往景区途中的购物场所，服务旅游团队的专门商店，商品批发市场和与餐饮、</span>
          <span style="font-family:宋体; font-size:12pt">娱乐、停车休息等相关联的购物场所等。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 1pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">8</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅游者投保的人身意外伤害保险，指旅游者自己购买或者通过旅行社、航空机票代理点、景区等保险代理机构购买的以旅行期间自身的生命、身体或者有关利益为保险标的的短期保险，包括但不限于航空意外险、旅游意外险、紧急救援保险、特殊项目意外险。</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">9</span>
          <span style="font-family:宋体; font-size:12pt">、离团，指团队旅游者经导游同意不随团队完成约定行程的行为。</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 25pt">
          <span style="font-family:宋体; font-size:12pt">10</span>
          <span style="font-family:宋体; font-size:12pt">、脱团，指团队旅游者未经导游同意脱离旅游团队，不随团队完成约定行程的行为。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:15.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 10pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">3</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page4"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:4.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">11</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、转团，指由于未达到约定成团人数不能出团，旅行社征得旅游者书面同意，在行程开始前将旅游者转至其他旅行社所组的境内旅游团队履行合同的行为。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">12</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、拼团，指旅行社在保证所承诺的服务内容和标准不变的前提下，在签订合同时经旅游者同意，与其他旅行社招徕的旅游者拼成一个团，统一安排旅游服务的行为。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.8pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:11.5pt">13</span>
          <span style="font-family:宋体; font-size:11.5pt">、不可抗力，指不能预见、不能避免并不能克服的客观情况，包括但不限于因自</span>
          <span
            style="font-family:宋体; font-size:11.5pt"
          >然原因和社会原因引起的，如自然灾害、战争、恐怖活动、动乱、骚乱、罢工、突发公共卫生事件、政府行为。</span>
        </p>
        <p style="line-height:19.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 18pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">14</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、已尽合理注意义务仍不能避免的事件，指因当事人故意或者过失以外的客观因素引发的事件，包括但不限于重大礼宾活动导致的交通堵塞，飞机、火车、班轮、城际客运班车等公共客运交通工具延误或者取消，景点临时不开放。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">15</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、必要的费用，指旅行社履行合同已经发生的费用以及向地接社或者履行辅助人支付且不可退还的费用，包括乘坐飞机（车、船）等交通工具的费用（含预订金）、饭店住宿费用（含预订金）、旅游观光汽车的人均车租等。</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">16</span>
          <span style="font-family:宋体; font-size:12pt">、公共交通经营者，指航空、铁路、航运客轮、城市公交、地铁等公共交通工具经营者。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二章合同的订立</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游行程单</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >旅行社应当提供带团号的《旅游行程单》（以下简称《行程单》），经双方签字或者盖章确认后作为本合同的组成部分。《行程单》应当对如下内容作出明确的说明：</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">）旅游行程的出发地、途经地</span>
          <span style="font-family:宋体; font-size:12pt">、目的地、结束地，线路行程时间和具体安排（按自然日计算，含乘飞机、车、船等在途时间，不足</span>
          <span style="font-family:宋体; font-size:12pt">24</span>
          <span style="font-family:宋体; font-size:12pt">小时以一日计）；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">）地接社的名称、地址、联系人和联系电话；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.8pt; margin:0pt 12pt 0pt 24pt">
          <span style="font-family:宋体; font-size:11.5pt">（</span>
          <span style="font-family:宋体; font-size:11.5pt">3</span>
          <span style="font-family:宋体; font-size:11.5pt">）交通服务安排及其标准（明确交通工具及档次等级、出发时间以及是否需中转等信息）；（</span>
          <span style="font-family:宋体; font-size:11.5pt">4</span>
          <span style="font-family:宋体; font-size:11.5pt">）住宿服务安排及其标准（明确住宿饭店的名称、地点、星级，非星级饭店应当注明是否有</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">空调、热水、独立卫生间等相关服务设施）；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">）用餐（早餐和正餐）服务安排及其标准（明确用餐次数、地点、标准）；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >）旅行社统一安排的游览项目的具体内容及时间（明确旅游线路内容包括景区点及游览项目名称等，景区点停留的最少时间）；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">）自由活动的时间；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">8</span>
          <span style="font-family:宋体; font-size:12pt">）行程安排的娱乐活动（明确娱乐活动的时间、地点和项目内容）；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 30pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">《行程单》用语须准确清晰，在表明服务标准用语中不应当出现</span>
          <span style="font-family:宋体; font-size:12pt">“</span>
          <span style="font-family:宋体; font-size:12pt">准</span>
          <span style="font-family:宋体; font-size:12pt">×</span>
          <span style="font-family:宋体; font-size:12pt">星级</span>
          <span style="font-family:宋体; font-size:12pt">”</span>
          <span style="font-family:宋体; font-size:12pt">、</span>
          <span style="font-family:宋体; font-size:12pt">“</span>
          <span style="font-family:宋体; font-size:12pt">豪华</span>
          <span style="font-family:宋体; font-size:12pt">”</span>
          <span style="font-family:宋体; font-size:12pt">、</span>
          <span style="font-family:宋体; font-size:12pt">“</span>
          <span style="font-family:宋体; font-size:12pt">仅供参考</span>
          <span style="font-family:宋体; font-size:12pt">”</span>
          <span style="font-family:宋体; font-size:12pt">、</span>
          <span style="font-family:宋体; font-size:12pt">“</span>
          <span style="font-family:宋体; font-size:12pt">以</span>
          <span style="font-family:宋体; font-size:12pt">××</span>
          <span style="font-family:宋体; font-size:12pt">为准</span>
          <span style="font-family:宋体; font-size:12pt">”</span>
          <span style="font-family:宋体; font-size:12pt">、</span>
          <span style="font-family:宋体; font-size:12pt">“</span>
          <span style="font-family:宋体; font-size:12pt">与</span>
          <span style="font-family:宋体; font-size:12pt">××</span>
          <span style="font-family:宋体; font-size:12pt">同级</span>
          <span style="font-family:宋体; font-size:12pt">”</span>
          <span style="font-family:宋体; font-size:12pt">等不确定用语。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第三条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">订立合同</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">旅游者应当认真阅读本合同条款、《行程单》，在旅游者理解本合同条</span>
          <span style="font-family:宋体; font-size:12pt">款及有关附件后，旅行社和旅游者应当签订旅游合同。</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">由旅游者的代理人订立合同的，代理人需要出具被代理的旅游者的授权委托书。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第四条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游广告及宣传品</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >旅行社的旅游广告及宣传品应当遵循诚实信用的原则，其内容符合《中华人民共和国合同法》要约规定的，视为本合同的组成部分，对旅行社和旅游者双方具有约束力。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第三章合同双方的权利义务</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第五条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅行社的权利</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、根据旅游者的身体健康状况及相关条件决定是否接纳旅游者报名参团；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、核实旅游者提供的相关信息资料；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">、按照合同约定向旅游者收取全额旅游费用；</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:19.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 11pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">4</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page5"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:2.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">、旅游团队遇紧急情况时，可以采取安全防范措施和紧急避险措施并要求旅游者配合；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">、拒绝旅游者提出的超出合同约定的不合理要求；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span style="font-family:宋体; font-size:12pt">、要求旅游者对在旅游活动中或者在解决纠纷时损害旅行社合法权益的行为承担赔偿责任；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">、要求旅游者健康、文明旅游，劝阻旅游者违法和违反社会公德的</span>
          <span style="font-family:宋体; font-size:12pt">行为。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第六条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅行社的义务</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、按照合同和《行程单》约定的内容和标准为旅游者提供服务，不擅自变更旅游行程安排；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、向合格的供应商订购产品和服务；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、不以不合理的低价组织旅游活动，诱骗旅游者，并通过安排购物或者另行付费旅游项目获取回扣等不正当利益；组织、接待旅游者，不指定具体购物场所，不安排另行付费旅游项目，但是，经双方协商一致或者旅游者要求，且不影响其他旅游者行程安排的除外；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 6pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:11.5pt">4</span>
          <span
            style="font-family:宋体; font-size:11.5pt"
          >、在出团前如实告知具体行程安排和有关具体事项，具体事项包括但不限于所到旅游目的地的重要规定、风俗习惯；旅游活动中的安全注意事项和安全避险措施、旅游者不适合参加旅游活动的情形；旅行社依法可以减免责任的信息；应急联络方式以及法律、法规规定的其他应当告知的事项；</span>
        </p>
        <p style="line-height:19.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">、按照合同</span>
          <span style="font-family:宋体; font-size:12pt">约定，为旅游团队安排符合《中华人民共和国旅游法》、《导游人员管理条例》规定的持证导游人员；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span style="font-family:宋体; font-size:12pt">、妥善保管旅游者交其代管的证件、行李等物品；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、为旅游者发放用固定格式书写、由旅游者填写的安全信息卡（包括旅游者的姓名、血型、应急联络方式等）；</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">8</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅游者人身、财产权益受到损害时，应当采取合理必要的保护和救助措施，避免旅游者人身、财产权益损失扩大；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">9</span>
          <span style="font-family:宋体; font-size:12pt">、积极协调处理旅游行程中的纠纷，采取适当措施防止损失扩大；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">10</span>
          <span style="font-family:宋体; font-size:12pt">、提示旅游者投保人身意外伤害保险；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">11</span>
          <span style="font-family:宋体; font-size:12pt">、向旅游者提供发票；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">12</span>
          <span style="font-family:宋体; font-size:12pt">、依法对旅游者个人信息保密；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">13</span>
          <span style="font-family:宋体; font-size:12pt">、旅游行程中解除合同的，旅行社应当协助旅游者返回出发地或者旅游者指定的合理地点。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第七条旅游者的权利</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、要求旅行社按照合同及《行程单》约定履行相关义务；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、拒绝未经事先协商一致的转团、拼团行为；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.7pt; margin:0pt 12pt 0pt 24pt; text-indent:0.25pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、有权自主选择旅游产品和服务，有权拒绝旅行社未与旅游者协商一致或者未经旅游者要求而指定购物场所、安排旅游者参加另行付费旅游项目的行为，有权拒绝旅行社的导游强迫或者变相强迫旅游者购物、参加另行付费旅游项目的行为；</span>
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">、在支付旅游费用时要求旅行社出具发票；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">、人格</span>
          <span style="font-family:宋体; font-size:12pt">尊严、民族风俗习惯和宗教信仰得到尊重；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span style="font-family:宋体; font-size:12pt">、在人身、财产安全遇有危险时，有权请求救助和保护；人身、财产受到损害的，有权依法获得赔偿；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">、在合法权益受到损害时向有关部门投诉或者要求旅行社协助索赔；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">8</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、《中华人民共和国旅游法》、《中华人民共和国消费者权益保护法》和有关法律、法规赋予旅游者的其他各项权利。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第八条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游者的义务</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、如实填写《旅游报名表》、游客安全信息卡等各项内容，告知与旅游活动相关的个人健康信息，并对其真实性负责，保证所提供的联系方式准确无误且能及时联系；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、按照合同约定支付旅游费用；</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:15.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 11pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">5</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page6"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:3.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:11.5pt">3</span>
          <span style="font-family:宋体; font-size:11.5pt">、遵守法律、法规和有关规定，不在旅游行程中从事违法活动，不参与色情、赌博和涉毒活动；</span>
        </p>
        <p style="line-height:19.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、遵守公共秩序和社会公德，尊重旅游目的地的风俗习惯、文化传统和宗教信仰，爱护旅游资源，保护生态环境，遵守《中国公民国内旅游文明行为公约》等文明行为规范；</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、对国家应对重大突发事件暂时限制旅游活动的措施以及有关部门、机构或者旅游经营者采取的安全防范和应急处置措施予以配合；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span style="font-family:宋体; font-size:12pt">、妥善保管自己的行李物品，随身携带现金、有价证券、贵重物品，不在行李中夹带</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">、在旅游活动中或者在解决纠纷时，应采取措施防止损失扩大，不损</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >害当地居民的合法权益；不干扰他人的旅游活动；不损害旅游经营者和旅游从业人员的合法权益，不采取拒绝上、下机（车、船）、拖延行程或者脱团等不当行为；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">8</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、自行安排活动期间，应当在自己能够控制风险的范围内选择活动项目，遵守旅游活动中的安全警示规定，并对自己的安全负责。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第四章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的变更与转让</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第九条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的变更</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅行社与旅游者双方协商一致，可以变更本合同约定的内容，但应当以书面形式由双方签字确认。由此增加的旅游费用及给对方造成的损失，由变更提出方承担；由此减少的旅游费用，旅行社应当退还旅游者。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、行程开始前遇到不可抗力或者旅行社、履行辅助人已尽合理注意义务仍不能避免的事件的，双方经协商可以取消行程或者延期出行。取消行程的，按照本合同第十四条处理；延期出行的，增加的费用由旅游者承担，减少的费用退还旅游者。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、行程中遇到不可抗力或者旅行社、履行辅助人已尽合理注意义务仍不能避免的事件，影响旅游行程的，按以下方</span>
          <span style="font-family:宋体; font-size:12pt">式处理：</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >）合同不能完全履行的，旅行社经向旅游者作出说明，旅游者同意变更的，可以在合理范围内变更合同，因此增加的费用由旅游者承担，减少的费用退还旅游者。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >）危及旅游者人身、财产安全的，旅行社应当采取相应的安全措施，因此支出的费用，由旅行社与旅游者分担。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >）造成旅游者滞留的，旅行社应采取相应的安置措施。因此增加的食宿费用由旅游者承担，增加的返程费用双方分担。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的转让</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >旅游行程开始前，旅游者可以将本合同中自身的权利义务转让给第三人，旅行社没有正当理由的不得拒绝，并办理相关转让手</span>
          <span style="font-family:宋体; font-size:12pt">续，因此增加的费用由旅游者和第三人承担。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >正当理由包括但不限于：对应原报名者办理的相关服务不可转让给第三人的；无法为第三人安排交通等情形的；旅游活动对于旅游者的身份、资格等有特殊要求的。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十一条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">不成团的安排</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 18pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >当旅行社组团未达到约定的成团人数不能成团时，旅游者可以与旅行社就如下安排在本合同第二十三条中做出约定。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、转团：旅行社可以在保证所承诺的服务内容和标准不降低的前提下，经事先征得旅游者书面同意，委托其他旅行社履行合同，并就受委托出团的旅行社违反本合同约定的行为先行承担责任，再行追偿。旅游者和受委托出团的旅行社另行签订合同的，本合同的权利义务终止。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.8pt; margin:0pt 6pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:11.5pt">2</span>
          <span
            style="font-family:宋体; font-size:11.5pt"
          >、延期出团和改变线路出团：旅行社经征得旅游者书面同意，可以延期出团或者改变其他线路出团，因此增加的费用由旅游者承担，减少的费用旅行社予以退还。需要时可以重新签订旅游合同。</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第五章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同的解除</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:19.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 11pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">6</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page7"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:2.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十二条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅行社解除合同</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.85pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、未达到约定的成团人数不能成团时，旅行社解除合同的，应当采取书面等有效形式。旅行社在行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">日（按照出发日减去解除合同通知到达日的自然日之差计算，下同）以上（含第</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >日，下同）提出解除合同的，不承担违约责任，旅行社向旅游者退还已收取的全部旅游费用；旅行社在行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">日以内（不含第</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">日，下同）提出解除合同的，除向旅游者退还已收取的全部旅游费用外，还应当按本合同第十七条第</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">款的约定，承担相应的违约责任。</span>
        </p>
        <p style="line-height:2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、旅游者有下列情形之一的，旅行社可以解除合同：</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 168pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">）患有传染病等疾病，可能危害其他旅游者健康和安全的；（</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">）携带危害公共安全的物品且不同意交有关部门处理的；（</span>
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">）从事违法或者违反社会公德的活动的；</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">）从事严重影响其他旅游者权益的活动，且不听劝阻、</span>
          <span style="font-family:宋体; font-size:12pt">不能制止的；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">）法律、法规规定的其他情形。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >旅行社因上述情形解除合同的，应当以书面等形式通知旅游者，按照本合同第十五条相关约定扣除必要的费用后，将余款退还旅游者。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十三条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游者解除合同</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.8pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:11.5pt">1</span>
          <span
            style="font-family:宋体; font-size:11.5pt"
          >、未达到约定的成团人数不能成团时，旅游者既不同意转团，也不同意延期出行或者改签其他线路出团的，旅行社应及时发出不能成团的书面通知，旅游者可以解除合同。旅游者在行程开始前</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:0.1pt"
        >
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >日以上收到旅行社不能成团通知的，旅行社不承担违约责任，向旅游者退还已收取的全部旅游费用；旅游者在行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">日以内收到旅行社不能成团通知的，按照本合同第十七条第</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">款相关约定处理。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.8pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:11.5pt">2</span>
          <span style="font-family:宋体; font-size:11.5pt">、除本条第</span>
          <span style="font-family:宋体; font-size:11.5pt">1</span>
          <span style="font-family:宋体; font-size:11.5pt">款约定外，在旅游行程结束前，旅游者亦可以书面等形式解除合同。旅游者在行程开始前</span>
          <span style="font-family:宋体; font-size:11.5pt">7</span>
          <span style="font-family:宋体; font-size:11.5pt">日以上提出解除合同的，旅行社应当向旅游者退还全部旅游费用；旅游者在行程开始前</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:0.1pt">
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >日以内和行程中提出解除合同的，旅行社按照本合同第十五条相关约定扣除必要的费用后，将余款退还旅游者。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:12pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">、旅游者未按约定时间到达约定集合出发</span>
          <span style="font-family:宋体; font-size:12pt">地点，也未能在出发中途加入旅游团队的，视为旅游者解除合同，按照本合同第十五条相关约定处理。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span
            style="font-family:宋体; font-size:12pt; font-weight:bold"
          >第十四条因不可抗力或者已尽合理注意义务仍不能避免的事件解除合同</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.7pt; margin:0pt 6pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >因不可抗力或者旅行社、履行辅助人已尽合理注意义务仍不能避免的事件，影响旅游行程，合同不能继续履行的，旅行社和旅游者均可以解除合同；合同不能完全履行，旅游者不同意变更的，可以解除合同。合同解除的，旅行社应当在扣除已向地接社或者履行辅助人支付且不可退还的费用后，将余款退还旅游者。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十五条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">必要的费用扣除</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、旅游者在行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">日以内提出解除合</span>
          <span style="font-family:宋体; font-size:12pt">同或者按照本合同第十二条第</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">款约定由旅行社在行程开始前解除合同的，按下列标准扣除必要的费用：</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span style="font-family:宋体; font-size:12pt">日至</span>
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">日，按旅游费用总额的</span>
          <span style="font-family:宋体; font-size:12pt">20%</span>
          <span style="font-family:宋体; font-size:12pt">；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">日至</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">日，按旅游费用总额的</span>
          <span style="font-family:宋体; font-size:12pt">40%</span>
          <span style="font-family:宋体; font-size:12pt">；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">行程开始当日，按旅游费用总额的</span>
          <span style="font-family:宋体; font-size:12pt">60%</span>
          <span style="font-family:宋体; font-size:12pt">。</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、在行程中解除合同的，必要的费用扣除标准为：</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">旅游费用</span>
          <span style="font-family:宋体; font-size:12pt">×</span>
          <span style="font-family:宋体; font-size:12pt">行程开始当日扣除比例</span>
          <span style="font-family:宋体; font-size:12pt">+</span>
          <span style="font-family:宋体; font-size:12pt">（旅游费用</span>
          <span style="font-family:宋体; font-size:12pt">-</span>
          <span style="font-family:宋体; font-size:12pt">旅游费用</span>
          <span style="font-family:宋体; font-size:12pt">×</span>
          <span style="font-family:宋体; font-size:12pt">行程开始当日扣除比例</span>
          <span style="font-family:宋体; font-size:12pt">)÷</span>
          <span style="font-family:宋体; font-size:12pt">旅游天数</span>
          <span style="font-family:宋体; font-size:12pt">×</span>
          <span style="font-family:宋体; font-size:12pt">已经出游的天数。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">如按上述第</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">款或者第</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >款约定比例扣除的必要的费用低于实际发生的费用，旅游者按照实际发生的费用支付，但最高额不应当超过旅游费用总额。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">解除合同的，旅行社扣除必要的费用后，应当在解除合同通知到达日起</span>
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">个工作日内为旅游者办结退款手续。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:19.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">7</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page8"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:18.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十六条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅行社协助旅游者返程及费用承担</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.7pt; margin:0pt 15pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span
            style="font-family:宋体; font-size:12pt"
          >旅游行程中解除合同的，旅行社应协助旅游者返回出发地或者旅游者指定的合理地点。因旅行社或者履行辅助人的原因导致合同解除的，返程费用由旅行社承担；行程中按照本合同第十二条第</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">款，第十三条第</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >款约定解除合同的，返程费用由旅游者承担；按照本合同第十四条约定解除合同的，返程费用由双方分担。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第六章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">违约责任</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十七条</span>
          <span
            style="width:17pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:89pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅行社的违约责任</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 9pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、旅行社在行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span style="font-family:宋体; font-size:12pt">日以内提出解除合同的，或者旅游者在行程开始前</span>
          <span style="font-family:宋体; font-size:12pt">7</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >日以内收到旅行社不能成团通知，不同意转团、延期出行和改签线路解除合同的，旅行社向旅游者退还已收取的全部旅游费用，并按下列标准向旅游者支付违约金：</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 198pt 0pt 24pt; text-align:justify">
          <span style="font-family:宋体; font-size:11.5pt">行程开始前</span>
          <span style="font-family:宋体; font-size:11.5pt">6</span>
          <span style="font-family:宋体; font-size:11.5pt">日至</span>
          <span style="font-family:宋体; font-size:11.5pt">4</span>
          <span style="font-family:宋体; font-size:11.5pt">日，支付旅游费用总额</span>
          <span style="font-family:宋体; font-size:11.5pt">10%</span>
          <span style="font-family:宋体; font-size:11.5pt">的违约金；行程开始前</span>
          <span style="font-family:宋体; font-size:11.5pt">3</span>
          <span style="font-family:宋体; font-size:11.5pt">日至</span>
          <span style="font-family:宋体; font-size:11.5pt">1</span>
          <span style="font-family:宋体; font-size:11.5pt">日，支付旅游费用总额</span>
          <span style="font-family:宋体; font-size:11.5pt">15%</span>
          <span style="font-family:宋体; font-size:11.5pt">的违约金；行程开始当</span>
          <span style="font-family:宋体; font-size:11.5pt">日，支付旅游费用总额</span>
          <span style="font-family:宋体; font-size:11.5pt">20%</span>
          <span style="font-family:宋体; font-size:11.5pt">的违约金。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 15pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">如按上述比例支付的违约金不足以赔偿旅游者的实际损失，旅行社应当按实际损失对旅游者予以赔偿。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 15pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">旅行社应当在取消出团通知或者旅游者不同意不成团安排的解除合同通知到达日起</span>
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">个工作日内，为旅游者办结退还全部旅游费用的手续并支付上述违约金。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 9pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、旅行社未按合同约定提供服务，或者未经旅游者同意调整旅游行程（本合同第九条第</span>
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >款规定的情形除外），造成项目减少、旅游时间缩短或者标准降低的，应当依法承担继续履行、采取补救措施或者赔偿损失等违约责任。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.7pt; margin:0pt 9pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">、旅行社具备履行条件，经旅游者要求仍拒绝履行本合同义务的，旅行社向旅游者支付旅游费用总额</span>
          <span style="font-family:宋体; font-size:12pt">30%</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >的违约金，旅游者采取订同等级别的住宿、用餐、交通等补救措施的，费用由旅行社承担；造成旅游者人身损害、滞留等严重后果的，旅游者还可以要求旅行社支付旅游费用一倍以上三倍以下的赔偿金。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.7pt; margin:0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">、未经旅游者同意，旅行社转团、拼团的，旅行社应向旅游者支付旅游费用总额</span>
          <span style="font-family:宋体; font-size:12pt">25%</span>
          <span style="font-family:宋体; font-size:12pt">的违约金；旅游者解除合同的，</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >旅行社还应向未随团出行的旅游者退还全部旅游费用，向已随团出行的旅游者退还尚未发生的旅游费用。如违约金不足以赔偿旅游者的实际损失，旅行社应当按实际损失对旅游者予以赔偿。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 15pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span style="font-family:宋体; font-size:12pt">、旅行社有以下情形之一的，旅游者有权在旅游行程结束后</span>
          <span style="font-family:宋体; font-size:12pt">30</span>
          <span style="font-family:宋体; font-size:12pt">日内，要求旅行社为其办理退货并先行垫付退货货款，或者退还另行付费旅游项目的费用：</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >）旅行社以不合理的低价组织旅游活动，诱骗旅游者，并通过安排购物或者另行付费旅游项目获取回扣等不正当利益的；</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:12pt">（</span>
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">）未经双方协商一致或者未经旅游者要求，旅行社指定具体购物场所或者安排另行付费旅</span>
          <span style="font-family:宋体; font-size:12pt">游项目的。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">6</span>
          <span style="font-family:宋体; font-size:12pt">、与旅游者出现纠纷时，旅行社应当采取积极措施防止损失扩大，否则应当就扩大的损失承担责任。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十八条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游者的违约责任</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅游者因不听从旅行社及其导游的劝告、提示而影响团队行程，给旅行社造成损失的，应当承担相应的赔偿责任。</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、旅游者超出本合同约定的内容进行个人活动所造成的损失，由其自行承担。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、由于旅游者的过错，使旅行社、履行辅助人、旅游从业人员或者其他旅游者遭受损害的，旅游者应当赔偿损失。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 9pt 0pt 0pt; text-indent:23.75pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅游者在旅游活动中或者在解决纠纷时，应采取措施防止损失扩大，否则应当就扩大的损失承担相应的责任。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:19.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 8pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">8</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page9"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:4.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:23.75pt"
        >
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅游者违反安全警示规定，或者对国家应对重大突发事件暂时限制旅游活动的措施、安全防范和应急处置措施不予配合，造成旅行社损失的，应当依法承担相应责任。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第十九条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">其他责任</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、由于旅游者自身原因导致本合同不能履行或者不能按照约定履行，或者造成旅游者人身损害、财产损失的，旅行社不承担责任。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅游者在自行安排活动期间人身、财产权益受到损害的，旅行社在事前已尽到必要警示说明义务且事后已尽到必要救助义务的，旅行社不承担赔偿责任。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:14.4pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、由于第三方侵害等不可归责于旅行社的原因导致旅游者人身、财产权益受到损害的，旅行社不承担赔偿责任。但因旅行社不履行协助义务致使旅游者人身、财产权益损失扩大的，旅行社应当就扩大的损失承担赔偿责任。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p
          style="line-height:13.75pt; margin:0pt 12pt 0pt 0pt; text-align:justify; text-indent:24pt"
        >
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、由于公共交通经营者的原因造成旅游者人身损害、财产损失依法应承担责任的，旅行社应当协助旅游者向公共交通经营者索赔。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第七章</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:71pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">协议条款</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:83pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">线路行程时间</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 32pt">
          <span style="font-family:宋体; font-size:12pt">出发</span>
          <span style="font-family:宋体; font-size:12pt">时间</span>
          <span
            style="width:77pt; text-indent:0pt; font-family:'Lucida Console'; font-size:12pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:157pt"
          >{{allData.itinerary?allData.itinerary.startDate:""}}</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">，结束时间</span>
          <span style="font-family:宋体; font-size:12pt">{{allData.itinerary?allData.itinerary.endDate:''}}</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">；共</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span
            style="font-family:宋体; font-size:12pt; text-decoration:underline"
          >{{allData.itinerary?allData.itinerary.days:''}}</span>
          <span
            style="width:6pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:343pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt">天，饭店住宿</span>
          <span
            style="width:18pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:433pt; text-decoration:underline"
          >{{allData.itinerary?allData.itinerary.nights:''}}</span>
          <span style="font-family:宋体; font-size:12pt">夜。</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:0pt">
          <tr style="height:13.7pt">
            <td colspan="5" style="vertical-align:bottom; width:94pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 23pt">
                <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十一条</span>
              </p>
            </td>
            <td colspan="9" style="vertical-align:bottom; width:349pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 2pt">
                <span style="font-family:宋体; font-size:12pt; font-weight:bold">旅游费用及支付（以人民币为计算单位）</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:11.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:15.2pt">
            <td colspan="4" style="vertical-align:bottom; width:92pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
                <span style="font-family:宋体; font-size:12pt">成人：</span>
                <span style="font-family:宋体; font-size:12pt">{{allData.cost.adultCost}}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:6pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt"></span>
              </p>
            </td>
            <td colspan="9" style="vertical-align:bottom; width:343pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">元</span>
                <span style="font-family:宋体; font-size:12pt">/</span>
                <span style="font-family:宋体; font-size:12pt">人，儿童（不满</span>
                <span style="font-family:宋体; font-size:12pt">14</span>
                <span style="font-family:宋体; font-size:12pt">岁）：</span>
                <span style="font-family:宋体; font-size:12pt">{{allData.cost.childCost || 0}}</span>
                <span style="font-family:宋体; font-size:12pt">元</span>
                <span style="font-family:宋体; font-size:12pt">/人；</span>
                <span style="font-family:宋体; font-size:12pt">其中，导游服务费</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="margin:0pt">
                <span
                  style="font-family:'Times New Roman'; font-size:12pt"
                >&#xa0; {{allData.cost.guideServiceCost || 0 }}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 1pt">
                <span style="font-family:宋体; font-size:12pt">元</span>
                <span style="font-family:宋体; font-size:12pt">/</span>
                <span style="font-family:宋体; font-size:12pt">人;</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:36pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:6pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:32pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:6pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:10pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:60pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style=" background-color:#000000;vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style=" background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style=" vertical-align:bottom; width:14pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style=" vertical-align:bottom; width:37pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:150pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:13pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.55pt">
            <td colspan="7" style="vertical-align:bottom; width:92pt">
              <p style="line-height:13.7pt; margin:0pt;padding-left:33px;">
                <span style="font-family:宋体; font-size:12pt">单人房差：</span>
                <span
                  style="font-family:宋体; font-size:12pt"
                >{{allData.cost.singleSupplementCost || 0}}</span>
                <span style="font-family:宋体; font-size:12pt">元/人</span>
              </p>
            </td>
            <!-- <td style="vertical-align:bottom; width:6pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>-->
            <!-- <td style="vertical-align:bottom; width:10pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>-->
            <!-- <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>-->
            <td style="vertical-align:bottom; width:18pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:60pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:14pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:37pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:150pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:36pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:6pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="4" style="  background-color:#000000; vertical-align:bottom; width:66pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style=" vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:60pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:201pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.55pt">
            <td colspan="8" style="vertical-align:bottom; width:150pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
                <span style="font-family:宋体; font-size:12pt">旅游费用合计：</span>
                <span style="font-family:宋体; font-size:12pt">{{allData.cost.totalCost}}</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:60pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="4" style="vertical-align:bottom; width:219pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">元。</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td colspan="6" style="vertical-align:bottom; width:108pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:60pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:201pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.55pt">
            <td colspan="8" style="vertical-align:bottom; width:150pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
                <span style="font-family:宋体; font-size:12pt">旅游费用支付方式：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:90pt">
              <p style="line-height:13.7pt; margin:0pt 24pt 0pt 0pt; text-align:right">
                <span
                  style="font-family:'Times New Roman'; font-size:12pt"
                >{{allData.cost.paymentMethod | getOrderPayType}};</span>
              </p>
            </td>
            <td colspan="5" style="vertical-align:bottom; width:231pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">。</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td colspan="7" style="vertical-align:bottom; width:132pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:60pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:201pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:14.55pt">
            <td colspan="8" style="vertical-align:bottom; width:150pt">
              <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
                <span style="font-family:宋体; font-size:12pt">旅游费用支付时间：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:60pt">
              <p style="line-height:13.7pt; margin:0pt; text-align:right">
                <span
                  style="font-family:'Times New Roman'; font-size:12pt"
                >{{allData.cost.paymentTime}};</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:12pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="3" style="vertical-align:bottom; width:201pt">
              <p style="line-height:13.7pt; margin:0pt">
                <span style="font-family:宋体; font-size:12pt">。</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:1pt">
            <td style="vertical-align:bottom; width:36pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:6pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:32pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:6pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:10pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:60pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:12pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="background-color:#000000; vertical-align:bottom; width:18pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="color:#ffffff; font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:14pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:37pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:150pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:13pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:67pt">
              <p style="line-height:1pt; margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:0.5pt">&#xa0;</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:36pt; border:none"></td>
            <td style="width:6pt; border:none"></td>
            <td style="width:18pt; border:none"></td>
            <td style="width:32pt; border:none"></td>
            <td style="width:6pt; border:none"></td>
            <td style="width:10pt; border:none"></td>
            <td style="width:24pt; border:none"></td>
            <td style="width:18pt; border:none"></td>
            <td style="width:60pt; border:none"></td>
            <td style="width:12pt; border:none"></td>
            <td style="width:18pt; border:none"></td>
            <td style="width:14pt; border:none"></td>
            <td style="width:37pt; border:none"></td>
            <td style="width:150pt; border:none"></td>
            <td style="width:13pt; border:none"></td>
            <td style="width:67pt; border:none"></td>
          </tr>
        </table>
        <p style="line-height:17.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 28pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十二条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:99pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">人身意外伤害保险</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、旅行社提示旅游者购买人身意外伤害保险；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、旅游者可以做以下选择：</span>
          <span style="font-family:宋体; font-size:12pt">3</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:2.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 25pt 0pt 0pt; text-indent:40.65pt">
          <span style="font-family:宋体; font-size:12pt">1.</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >委托旅行社购买（旅行社不具有保险兼业代理资格的，不得勾选此项）：保险产品名称（投保的相关信息以实际保单为准）；</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 41pt">
          <span style="font-family:宋体; font-size:12pt">2.</span>
          <span style="font-family:宋体; font-size:12pt">自行购买；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 41pt">
          <span style="font-family:宋体; font-size:12pt">3.</span>
          <span style="font-family:宋体; font-size:12pt">放弃购买；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 41pt">
          <span style="font-family:宋体; font-size:12pt">4.</span>
          <span style="font-family:宋体; font-size:12pt">同意旅行社赠送人身意外保险。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十三条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:11.5pt; font-weight:bold">成团人数与不成团的约定</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">成团的最低人数：</span>
          <span style="font-family:宋体; font-size:12pt">{{allData.groupAgreement.leastCustomerNumber}}</span>
          <span style="font-family:宋体; font-size:12pt; text-decoration:underline"></span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">人。</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">如不能成团，旅游者按以下第</span>
          <span
            style="width:11pt; text-indent:0pt; font-family:'Lucida Console'; font-size:12pt; text-decoration:underline; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:191pt"
          >{{allData.groupAgreement.resolution || 1}}</span>
          <span style="font-family:宋体; font-size:12pt">方式解决：</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt"></span>
          <span
            style="font-family:宋体; font-size:12pt"
          >1、旅行社委托{{allData.groupAgreement.mergeToCompanyName}}</span>
          <span style="font-family:等线; font-size:10pt; text-decoration:underline"></span>
          <span style="font-family:宋体; font-size:11.5pt">旅行社履行合同；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、延期出团；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">、改变其他线路出团；</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span style="font-family:宋体; font-size:12pt">、解除合同。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 27pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十四条</span>
          <span
            style="width:17pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:104pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">拼团约定</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">旅游者</span>
          <span
            style="font-family:宋体; font-size:12pt;border-bottom:1px solid #000;"
          >{{allData.groupAgreement?'同意':"不同意"}}</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">（同意或者不同意，打勾无效）采用拼团方式拼至</span>
          <span
            style="width:17pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:371pt"
          ></span>
          <span
            style="font-family:宋体; font-size:12pt;border-bottom:1px solid #000;"
          >{{allData.groupAgreement.mergeToCompanyName}}</span>
          <span
            style="width:18pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:437pt"
          ></span>
          <span style="font-family:宋体; font-size:11.5pt">旅行社成团。</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十五条</span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold"></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">自愿购物和参加另行付费旅游项目约定</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、旅游者可以自主决定是否参加旅行社安排的购物活动、另行付费旅游项目；</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:19.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt 11pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">9</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.7pt; margin:0pt">
          <a name="page10"></a>
          <span style="font-family:宋体; font-size:12pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:185pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:341pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:4.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、旅行社可以在不以不合理的低价组织旅游活动、不诱骗旅游者、不获取回扣等不正当利益，且不影响其他旅游者行程安排的前提下，按照平等自愿、诚实信用的原则，与旅游者协商一致达成购物活动、另行付费旅游项目协议；</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">3</span>
          <span style="font-family:宋体; font-size:12pt">、购物活动、另行付费旅游项目安排应不与《行程单》冲突；</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">4</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、地接社及其从业人员在行程中安排购物活动、另行付费旅游项目的，责任由订立本合同的旅行社承担；</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt; text-align:justify; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">5</span>
          <span
            style="font-family:宋体; font-size:12pt"
          >、购物活动、另行付费旅游项目具体约定见《自愿购物活动补充协议》、《自愿参加另行付费旅游项目补充协议》。</span>
        </p>
        <p style="line-height:17.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十六条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">争议的解决方式</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.4pt; margin:0pt 1pt 0pt 0pt; text-align:justify; text-indent:24pt">
          <span
            style="font-family:宋体; font-size:12pt"
          >本合同履行过程中发生争议，由双方协商解决；亦可向合同签订地的旅游质监执法机构、消费者协会、有关的调解组织等有关部门或者机构申请调解。协商或者调解不成的，按下列第</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt; text-decoration:underline"></span>
          <span style="font-family:宋体; font-size:12pt; text-decoration:underline"></span>
          <span style="font-family:宋体; font-size:12pt">种方式解决：</span>
        </p>
        <p style="line-height:1.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">1</span>
          <span style="font-family:宋体; font-size:12pt">、提交</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:77pt"
          ></span>
          <span
            style="width:150pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:155pt"
          >{{allData.dispute.tribunalName}}</span>
          <span style="font-family:宋体; font-size:11.5pt">仲裁委员会仲裁；</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:0.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">2</span>
          <span style="font-family:宋体; font-size:12pt">、依法向人民法院起诉。</span>
        </p>
        <p style="line-height:17.45pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十七条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">其他约定事项</span>
        </p>
        <p style="line-height:1.85pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt">未尽事宜，经旅游者和旅行社双方协商一致，可以列入补充条款。</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 42pt">
          <span style="font-family:宋体; font-size:12pt">{{allData.supplementaryClause}}</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.7pt; margin:0pt 0pt 0pt 24pt">
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">第二十八条</span>
          <span
            style="width:11pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:95pt"
          ></span>
          <span style="font-family:宋体; font-size:12pt; font-weight:bold">合同效力</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.75pt; margin:0pt 6pt 0pt 0pt; text-indent:24pt">
          <span style="font-family:宋体; font-size:12pt">本合同一式</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt; text-decoration:underline">2</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">份，双方各持</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt; text-decoration:underline">1</span>
          <span style="font-family:宋体; font-size:12pt"></span>
          <span style="font-family:宋体; font-size:12pt">份，具有同等法律效力，自双方当事人签字或者盖章之日起生效。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <!-- <div>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">10</span>
        </p>
      </div> -->
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
         <div>
        <p style="line-height:15.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">1</span>
          <span style="font-family:宋体; font-size:9pt">0</span>
        </p>
      </div>
      <!-- 游客名单表 -->
      <div>
        <p style="text-align: center">游客名单表</p>
        <el-table :data="allData.touristsInfo.tourists" border style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="ID.IDNumber" label="证件号码"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <!-- <el-table-column
                label="民族">
                </el-table-column>
                <el-table-column
                label="是否儿童">
          </el-table-column>-->
          <el-table-column prop="phone" label="手机号"></el-table-column>
        </el-table>

        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <!-- 11 -->
      <div>
        <p style="line-height:15.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">1</span>
          <span style="font-family:宋体; font-size:9pt">1</span>
        </p>
      </div>
      <!-- 自愿购物活动补充协议 -->
       <div>
        <p style="text-align: center">自愿购物活动补充协议</p>
         <el-table :data="allData.shoppings" border style="width: 100%">
          <el-table-column prop="date" label="具体时间" width="180"></el-table-column>
          <el-table-column prop="place" label="地点"></el-table-column>
          <el-table-column prop="shoppingPlace" label="购物场所名称"></el-table-column>
         
          <el-table-column prop="goods" label="主要商品信息"></el-table-column>
          <el-table-column  prop="stayDuration" label="最长停留时间其他说明（分钟）"></el-table-column>
          <el-table-column  prop="memo"  label="其他说明"> </el-table-column>

        </el-table>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <!-- 12 -->
      <div>
        <p style="line-height:15.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">1</span>
          <span style="font-family:宋体; font-size:9pt">2</span>
        </p>
      </div>
      <!-- 自愿参加另行付费旅游项目补充协议 -->
       <div>
         <p style="text-align: center">自愿参加另行付费旅游项目补充协议</p>
         <el-table :data="allData.activities" border style="width: 100%">
          <el-table-column prop="date" label="具体时间" width="180"></el-table-column>
          <el-table-column prop="place" label="地点"></el-table-column>
          <el-table-column prop="item" label="项目名称和内容"></el-table-column>
          <el-table-column prop="fee" label="费用（元）"></el-table-column>
          <el-table-column prop="stayDuration" label="项目时长（分钟）"></el-table-column>
           <el-table-column prop='memo' label="其他信息"></el-table-column>
        </el-table>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>

        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:auto">
      <div>
        <p style="line-height:15.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.3pt; margin:0pt; text-align:center">
          <span style="font-family:宋体; font-size:9pt">1</span>
          <span style="font-family:宋体; font-size:9pt">3</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.15pt; margin:0pt">
          <a name="page14"></a>
          <a name="page15">
            <span style="-aw-bookmark-end:page14"></span>
          </a>
          <span style="font-family:宋体; font-size:11.5pt">全国统一旅游电子合同编号： {{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt"></p>
        <div style="width:527pt; height:10pt;"></div>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.35pt; margin:0pt">
          <a name="page19"></a>
          <span style="font-family:宋体; font-size:10.5pt">附件</span>
          <span style="font-family:Calibri; font-size:10.5pt">1</span>
          <span style="font-family:宋体; font-size:10.5pt">：</span>
        </p>
        <p style="line-height:2.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">8/12</span>
        </p>
        <p style="line-height:3.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">安全告知书</span>
        </p>
        <p style="line-height:4.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">尊敬的游客</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
        </p>
        <p style="line-height:1.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">您好</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
          <span style="font-family:宋体; font-size:10.5pt">感谢您选择（旅行社）为您提供出游服务</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
          <span style="font-family:宋体; font-size:10.5pt">为了确保您旅行安全和顺畅，请仔细阅读这份我们特别为您提供的旅行</span>
          <span style="font-family:Calibri; font-size:10.5pt">«</span>
        </p>
        <p style="line-height:1.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">安全告知书</span>
          <span style="font-family:Calibri; font-size:10.5pt">»</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >。此外，亦请您细心留意行程中领队或导游的友情提示及各地旅游设施的安全告知、口头告知，以避免不必</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">要的人身损害和财产损失，预祝您旅行愉快</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">一、参团注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、根据自身情况，谨慎选择旅游线路及项目</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >请您在充分了解旅途的辛苦和行程中医疗条件有限的前提下，确定自己的身体健康状况适合参加本次旅游活动后方可报名</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >参团，如因个人既有病史和身体残障在旅游行程中引起的疾病进一步发作和伤亡，旅行社将不承担任何责任。现有的旅游</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >意外险条款中，此种情况也为保险公司的免赔范围，旅行社为非健康医疗专业咨询机构，无法准确判定游客的身体健康状</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >况是否适合参加本次旅游活动。游客在旅行社签订旅游合同，即视为游客已经了解本次旅行的辛苦程度和行程中医疗条件</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">有限的前提，并征得专业医生的同意。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">２、特殊人群参团，特别注意事项</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.9pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">特殊人群参团，应签署</span>
          <span style="font-family:Calibri; font-size:10.5pt">«</span>
          <span style="font-family:宋体; font-size:10.5pt">旅游者健康状况确认书</span>
          <span style="font-family:Calibri; font-size:10.5pt">»</span>
          <span style="font-family:宋体; font-size:10.5pt">或</span>
          <span style="font-family:Calibri; font-size:10.5pt">«</span>
          <span style="font-family:宋体; font-size:10.5pt">参团承诺书</span>
          <span style="font-family:Calibri; font-size:10.5pt">»</span>
          <span style="font-family:宋体; font-size:10.5pt">游客出现急症请主动通知工作人员，旅</span>
          <span style="font-family:宋体; font-size:10.5pt">行社将协</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">助游客就近送往当地医疗机构检查治疗。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">未成年人保护</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >旅行社不接受未满十八周岁、不具备完全民事行为能力的未成年人单独参团，未成年人必须有成年直系</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >亲属陪伴方可参团，一起报名参团的成人即为其参团过程中的监护人，有责任和义务做好未成年人的安全防范工作。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">有听力、视力、行动障碍的游客须有健康旅伴陪同方可参团。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">个人有精神疾病和无行为控制能力的不能报名参团。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >身体健康状况欠佳者，请咨询医生是否可以参加本次旅游活动，根据自身情况备好常用药和急救药品。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">因自身疾病而引发的后果，游客自行承担责任。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">二、出团前准备事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、特殊气候地理条件，防护措施非常必要</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">出发前请充分了解当地的气候、气温，旅游顾问或领队会在出行前向您介绍当地气候、</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">气温等，请按旅游顾问或领队的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">建议准备相应物品。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >不同的地区气候多变，如果您的旅途涉及热带、高原、海滨、草原等特殊的气候、地理条件，请注意采取必要的防护措</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">施，做好防晒、防蚊虫、防高原反应等准备工作。老年人、儿</span>
          <span style="font-family:宋体; font-size:10.5pt">童及体弱者等易感冒人群，应当备足适宜的衣物，以便随时</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >增减，出行应穿旅游鞋或软底防滑鞋，携带相应的用品，如雨伞、遮阳帽、墨镜等。上年纪的人带上手杖。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page20"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">由于某些地区或旅游项目只有穿长袖衣裤才适合，因此长短袖衣裤均必不可少。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">2</span>
          <span style="font-family:宋体; font-size:10.5pt">、提前检查身体，自行备足药品</span>
        </p>
        <p style="line-height:4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >临行前应确保身体健康，如有体质较弱或者曾患病者必须坚持治疗，防止旧病复发。如游客有长期用药的需求，出团前</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">请告诉旅行社，以便领队、导游在行程中可提醒您按时服药。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">为防止水土不服或意外，请自行备足常用及急救药品，如创可贴</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">感冒药、</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">晕车药、</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">止泻药、消炎药、风油精、健胃</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">药、抗过敏药等。领队导游不能给您提供任何药品且无权提供用药建议。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >患有心脏病、高血压、恐高症、精神病、孕妇及行动不能自理、自控的客人和患有疾病、残疾等或以赛事为主的人员不</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">建议出行。但是如果自身认为有参团条件。请自觉不要参与</span>
          <span style="font-family:宋体; font-size:10.5pt">对自己身体不适宜的活动。不参</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">与需要大量消耗体力或有可能</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">对特殊体质产生影响的活动。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">３、了解护照及签证事宜，保证顺利出行</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">有效身份证件</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >游客出发时必须携带有效身份证件。参加国内旅游时须携带有效期内的身份证。出境游须带齐护照或通</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >行证原件。如因个人原因没有携带有效身份证件造成无法办理入住或出境手续造成的损失，游客自行承担责任。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">因公护照不能参团，报名时请您携带因私护照参团。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">持香港护照的游客须自行携带回乡证，外籍游客及签证自理的游客请您自行携带在有效</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">期内的护照及返回中国的有效签</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">证及相关证件。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">有些国家对护照或签证有特殊要求，旅行社将向游客详细讲解。请您注意，如巴厘岛要</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">求出团时游客自行携带护照原</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">件，外籍游客自理签证。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">三、行程中注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、出发当天，准时集合</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">认真阅读出团通知</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">行程单</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">务必在规定的时间内到达指定的地点，安排好从家中到集合地点的路线和交通工具，并携带相</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12.7pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">关票证</span>
          <span style="font-family:Calibri; font-size:10pt">(</span>
          <span style="font-family:宋体; font-size:10pt">从外地前往集合地点的游客建议提前一天抵达</span>
          <span style="font-family:Calibri; font-size:10pt">)</span>
          <span style="font-family:宋体; font-size:10pt">。如因自身原因造成无法登机或延误，</span>
        </p>
        <p style="line-height:3.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">一切损失需要您自行承担。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">２、贵重物品，妥善保管</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >证件和贵重物品，如护照、身份证、机票、现金、支票、银行卡、邀请函原件和复印件等，请务必随身携带，一定不要放</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >在托运的行李中。如因放入托运的行李中而丢失的，旅行社不承担责任。仅负有协助您向航空公司索赔的义务。有些国家</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.9pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >或地区对入境安检有特殊要求，请您按照旅行社的讲解进行操作，以免造成不必要的麻烦或损失。例如前往北美地区</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">美</span>
        </p>
        <p style="line-height:1.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">国、加拿大</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">旅游，行李箱请勿上锁，否则会被划开检</span>
          <span style="font-family:宋体; font-size:10.5pt">查。</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">３、在交通工具上注意事项</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >如您需在飞机上调整座位，应在飞机起飞且平稳后协商调换。切不可挡住通道，影响其他客人通行。调换位置后，请不</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">要与对方更换登机牌，否则会影响销签事宜。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">出外旅游携带的行李要求轻便旅行箱、包要坚固耐用。应尽量避免携带贵重物品。行李</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page21"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">如需托运，切勿将现金及贵重物</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">品放在托运行李中。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >搭乘飞机时请您扣好安全带，不要在飞机上使用手提移动电话等相关电子品。不要在飞机上随意走动</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >乘机、坐车、上船时要注意扶梯，在台阶处站稳，乘车时扣好安全带，注意颠簸路段及司机急刹车以免扭伤或摔伤身</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >体，行车途中不要在车内走动、追逐嬉戏。老人和儿童要有成年人陪护，年龄比较小的最好是有成年人抱在怀中。以免在</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">紧急制动时发生危险。车辆在颠簸路段行驶过程中请不要喝水或吃东西</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">主要是坚果类</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">以免发生呛水或卡咽等危险情况。</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">在车上、船上开窗通风时，不得把身体伸向窗外，以免发生危险。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">有晕车、晕船、高血压、心脏病病症的客人，请提前服用有效的药物。在旅途中若是有</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">不舒服的症状，请及时告诉领队</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">或导游。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">乘坐交通工具</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">如火车、轮船、巴士、游轮等</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">抵达目的地后，注意检查随身行李和物品，避免遗忘物品。若因自身注意</span>
        </p>
        <p style="line-height:3.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">不够导致丢失的，责任由您自行承担。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">４、酒店注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">入住宾馆后请仔细阅读住宿须知，爱护宾馆内的各种物品，损坏照价赔偿。同时请保管好</span>
        </p>
        <p style="line-height:4.1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">房卡或钥匙检查房间内设施</span>
          <span style="font-family:Calibri; font-size:10.5pt">(</span>
          <span style="font-family:宋体; font-size:10.5pt">卫</span>
        </p>
        <p style="line-height:1.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">浴设备、遥控器、烟缸、毛巾浴巾等</span>
          <span style="font-family:Calibri; font-size:10.5pt">)</span>
          <span style="font-family:宋体; font-size:10.5pt">是否有损坏并及时告知酒店，以免退房时发生不必要的麻烦。</span>
          <span style="font-family:Calibri; font-size:10.5pt">9/12</span>
        </p>
        <p style="line-height:1.95pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">在使用房间内物品时，看清是否是免费使用的，如使用非免费物品请看清标价。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">请勿在房间内大声喧哗，乱涂乱写乱倒垃圾。不要在床上吸烟和饮酒，禁止在屋內燃烧</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">任何东西，有事与服务员和领队</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">联系。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >沐浴时应把浴帘拉好，防止洗澡水外溢至卫生间外。同时地面、浴缸容易打滑，一定要先把防滑垫放好以防滑倒摔伤。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">如遇雨雪天气，进入酒店大堂时或上下酒店楼梯时容易滑倒，务必注意脚下防滑</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">出入酒店房间请随手关门并把门窗锁好，不要随便开门或让陌生人进入房间以免上当受骗。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >请妥善保管好自己的财物，贵重物品及有效证件要随身携带或申请酒店的保险柜服务。不要将贵重物品及证件放入托运</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">的行李、住宿的房间里以及游轮上、船上房间内。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">每次退房前，请检查您所携带的行李物品，特别注意您的证件和贵重物品。</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">●</span>
          <span style="font-family:宋体; font-size:10pt">应留意酒店内附属设施的开放时间及使用规则，请勿在酒店泳池闭馆时间私自下池戏水。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">有些国家地区的酒店内不允许在房间内食榴莲等异味较大、山竹等果皮颜色和果汁颜色</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">较深的水果，否则会被处以罚</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">款。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >您在酒店使用热水壶、电吹风等小电器时要了解当地电压、酒店电线线路等，并按照产品使用说明操作，以免短路损坏</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">酒店设施，酒店将要求游客照价赔偿。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">５、景区注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0.3pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">抵达景区游览前，请您谨记领队或导游交代的集合地点、时间、所乘游览车号。万一走</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page22"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">失请于集合地点等候导游返回寻</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">找。</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">●</span>
          <span style="font-family:宋体; font-size:10pt">团体旅行时不可擅自脱队，单独离队，随身应携带当地住宿饭店地址、领队及导游电话。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">以免发生意外。参加团队旅</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >游，要听从领队或导游的指挥安排，不随意活动，以免发生离群、掉队、迷路等事件。要随时注意团队的去向，以免掉</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >队。旅行期间，团友应互敬互谅，配合领队和导游工作。如有违法或者违规行为，领队和导游有权制止或采取相应措施。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >行程中或自由活动时不参加危险活动项目，如攀岩、漂流、冲浪、高速摩托艇、水上飞机、高速游轮、潜水艇等项目。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >如执意参加，要听从该处工作人员的安排。落实各项安全措施，切忌麻痹大意。带儿童的游客，参加此类活动应照顾好自</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >己的孩子，不要让他们独自活动。身体状况不佳者请勿参加。患有心脏病、肺病、哮喘病、高血压、恐高症者切忌从事水</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">上、高空活动。如有意外发生，我社不承担责任。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">因无法预测水下状况</span>
          <span style="font-family:宋体; font-size:10.5pt">、海啸、台风、海蜇、海胆、水母、鲨鱼、珊瑚、溺水等等意外的发生，旅行社不组织游客参加游</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >泳、潜水等水上或下水项目。如游客执意下水也需根据自身情况仔细斟酌后再下水。同时避免到无人清理或深海里游泳。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">不熟悉水性者，切勿独自下水。</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">儿童一定要有家长陪同一起游玩，如有意外发生，我社不承担责任。</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">搭乘快艇、游船、漂流木筏，参加水上活动，请按规定穿着救生衣，并遵照工作人员的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">指导。如有晕水、晕船者请勿游</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">玩水上项目。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 60.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >游客在乘坐缆车、直升机或其它高空项目时，一定要注意安全，系好安全带。６、游轮旅游注意事项</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.9pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">自备药物</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >如果您有平时惯用或长期服用的药物，请不要忘记携带，比如抗高血压、心脏病、胃病或糖尿病等方面的药</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >品。如果所经海域风浪较大，有时可能会出现晕船，即使您的身体非常健康，也建议您携带一些常备药品以备应急之需，</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">如感冒药、晕车药、</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">抗过敏药、腹泻药、创可贴等。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 16.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">包船岸上观光游</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >由于签证原因，所有游客必须在国内提前选择全程的岸上观光游套餐，如果由于特殊原因不能下船游</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">览，请您提前通知领队，按照船方规定</span>
          <span style="font-family:宋体; font-size:10.5pt">来办理相关的入境盖章业务。行程确认之后不能取消，费用不退，然后按照您报名</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">参加的线路于通知的时间和地点集合下船游览。如遇天气原因邮轮无法正常靠岸，导致岸上</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">观光游被迫取消，属于不可抗</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">力，按照合同约定费用不退。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">自行参加邮轮公司的岸上观光游</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span style="font-family:宋体; font-size:10.5pt">游客在邮轮上自愿选择邮轮公司组织的岸上观光</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">有关行程、购物等安排以邮轮公司安</span>
        </p>
        <p style="line-height:3.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">排为准。由此产生的问题也和邮轮公司沟通联系，旅行社不承担任何连带责任。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 16.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:Calibri; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">有关证件</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >请您务必随身携带有效期半年以上的护照原件，如果您持有的是港澳台护照，请您务必随身携带回乡证。如果</span>
        </p>
        <p style="line-height:3.75pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">您持有的是外籍护照一定要有多次往返中国签证，以便办理相关手续。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.85pt; margin:0pt">
          <a name="page23"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">有关行李托运</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >现金、证件或贵重物品须随身携带，不应放进托运行李内，也不应在外出时留在房间。船方禁止游客自行</span>
        </p>
        <p style="line-height:5.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >携带酒类上船，请不要将酒放于行李中。以免造成行李被扣留延误登船，严禁托运携带任何危险物品或刀具。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">救生演习</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span style="font-family:宋体; font-size:10.5pt">根据国际海事公约所有客轮上游客及船员于启航前必须进行安全演习，请您留意船上广播而所有客</span>
          <span style="font-family:宋体; font-size:10.5pt">舱内均放置</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">有救生指南。客舱门后亦贴有救生通告指引，请您仔细阅读有关内容。</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">安全管理</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >因检疫要求，陆上水果与蔬菜请勿带上船。船上的水果与蔬菜类亦请勿携带登岸。同时根据国际法规定，在返</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">回登船前，您必须经过安全检查。</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">邮轮结束前准备</span>
          <span style="font-family:Calibri; font-size:10.5pt">:</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >离船前一夜，船方会通知游客结账的时间和地点。结账时会给游客一份私人消费账单，请仔细对帐，核</span>
        </p>
        <p style="line-height:5.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >对无误后可以现金或者信用卡结账。结账后可领回护照，船卡仍能刷卡消费，但是以免下船前再次结账耽误时间，请结账</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 328.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">后最好不要再消费。７、饮食卫生注意事项</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >旅行中请注意卫生安全。传染病、流行病等。时时刻刻注意防治，餐前先洗手，不食用不卫生、不合格的食品和饮料。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">因个人信仰、口味要求不同。若有特殊要求应提前向旅行社说明。以便导游更好的为您安排饮食。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">在外旅游时请重视饮食卫生。严防</span>
          <span style="font-family:宋体; font-size:10.5pt">“</span>
          <span style="font-family:宋体; font-size:10.5pt">病从口入</span>
          <span style="font-family:宋体; font-size:10.5pt">”</span>
          <span style="font-family:宋体; font-size:10.5pt">。不吃不洁和生冷食品，不采摘食用路边蔬果。对各地的风味小吃、土</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">特产食品应以品尝为主，一次不宜吃得太多。更不能暴饮暴食。以免引起消化不良等。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 34pt; text-indent:-16pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">多吃些新鲜蔬菜和水果，少食油腻和辛辣生冷食物，最好少饮或不饮酒。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >吃海鲜应选择新鲜的海鲜，吃海鲜不宜饮啤酒、不宜与某些水果同吃，且吃海鲜后不要马上去游泳。对海鲜过敏的游客</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">请禁食海鲜，以免引起过敏乃至中毒反应。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 81.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >各地水质略有不同，可能产生水土不服、拉肚子的情况。建议饮用瓶装水、风俗习惯、宗教礼仪注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 34pt; text-indent:-16pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10.5pt">到达目的地国家后请您入乡随俗，尊重当地的风俗习惯。</span>
        </p>
        <p style="line-height:4.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 34pt; text-indent:-16pt">
          <span style="font-family:宋体; font-size:10pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span style="font-family:宋体; font-size:10pt">前往宗教场所时请您特别注意当地的礼仪，避免因不了解宗教习俗而产生</span>
          <span style="font-family:宋体; font-size:10pt">宗教误解及冲</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">突。</span>
        </p>
        <p style="line-height:3.45pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 21.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">Ａ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">进入基督教教堂需脱帽和摘下墨镜，男士不能穿短裤，保持安静，穿着不能过于暴露。Ｂ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">犹太教场所需带帽子进入。</span>
        </p>
        <p style="line-height:1.75pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">Ｃ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">进入伊斯兰教场所需准许并要脱鞋，女士需要戴上面纱才可进入。</span>
        </p>
        <p style="line-height:2.25pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 94.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">Ｄ</span>
          <span style="font-family:Calibri; font-size:10.5pt">.</span>
          <span style="font-family:宋体; font-size:10.5pt">进入泰国寺庙，女士不可穿裙子进入，进门前要脱鞋，不能脚踏门槛。四、特别安全提示</span>
        </p>
        <p style="line-height:5.3pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >自由活动期间应谨慎行为，加强自我保护。在旅游者自行安排活动期间，旅行社仅负有安全提示、救助义务。除此以外，</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 213.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">旅行社对旅游者的人身、财产损失不承担责任。１、切忌单独外出</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">谨慎参加高风险活动</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt; text-indent:0pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >自行安排活动期间，包括在我社安排的旅游行程中独立的自由活动期间、旅游者不参加旅游行程的活动期间及在经导游</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:宋体; font-size:10.5pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">或领队同意暂时离队的个人活动期间，请您时刻注意人身及财产安全，切忌单独外出，外出</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page24"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">时应当至少保持两三人一起活</span>
        </p>
        <p style="line-height:3.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">10/12</span>
        </p>
        <p style="line-height:3.05pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">动。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >自行安排活动期间，谨慎选择自己能够控制风险的活动项目务必充分了解活动的内容并严格遵守活动项目的安全规定，</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >根据自身身体情况决定运动时间、运动量，避免意外事件的发生。活动前要了解具体的活动常识、活动范围、活动方法等</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >相关规定、注意事项。选择适合自己的项目，活动前检查好各种器械，注意安全，服从指导人员的指挥</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">特别是患有心脏</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >病、高血压、恐高症等不宜参加剧烈或激烈活动的旅游者，不要选择与自身身体情况不相适应的活动，以免发生不测。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">不建议您参加高风险活动，如直升机、热气球、滑雪、滑草、滑沙、潜水、漂流、</span>
          <span style="font-family:宋体; font-size:10.5pt">游泳等。坚决不参加吉普车越野、摩</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">托车驾驶、自驾车、蹦极、水上摩托、滑翔伞、冲浪、探险等高风险项目。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">游泳及潜水入水前请确认身体状况适合游泳。没有影响身体机能的慢性病及心脏病</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">入水前严禁暴饮暴食及空腹下水，</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >杜绝单独下水。游泳时应有身强体壮或有照应能力的同伴跟随，因个人体质不同可能会出现晒伤及光过敏，请客人自己考</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >量并自行承担晒伤后果。如在境外参加潜水，浮潜等活动前，请确保自己会游泳及会使用潜水设备。如有外籍教练进行活</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">动前培训，应确保能够正确理解教练的一切意图，否则不要参加此项活动。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">五、其它注意事项</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">１、维护国家形象，文明出行，妥善言行</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >中国是文明古国，请在外旅游时请做到礼貌待人、公共场所不大声喧哗、吸烟。不随地吐痰、乱扔废弃物。不在景点乱</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >写乱画，带孩子的家长要关照孩子，不要在严禁嬉戏的公共场所内随意嬉戏，叫喊，乱跑，不私自燃放烟花炮竹，车上、</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >船上不吃水果及瓜子等带皮食品，不食用冰激凌汉堡包等。否则当地司机有可能不开车或者不准许客人上车。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">用餐时切记请勿大声喧哗、敲打餐具、划拳行令，取菜、饭，应</span>
          <span style="font-family:宋体; font-size:10.5pt">顾全大局。如用自助餐应切记浪费，请吃完自己盘内食</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 55.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >物后再次拿取，如果将自己喜好的餐食，全部划为己有，是不礼貌和自私的行为。２、听从安排，意外事件发生时不要慌张</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >因自然原因和社会原因引起的不可抗力事件，如自然灾害、战争、罢工、重大传染性疫情、政府行为等，或影响旅行行</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >程的列车和航班等公共交通工具的延误或取消、恶劣天气变化、交通堵塞、重大礼宾活动等事件，旅行社不承担赔偿责</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >任，但会积极采取补救措施减少您的损失，如影响行程或服务标准的，无论情况是否紧急，请您千万不要慌张，镇定判断</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">情况，注意当地的预警报告，提高自我保护意识，服从有关部门的指挥</span>
          <span style="font-family:宋体; font-size:10.5pt"></span>
          <span style="font-family:宋体; font-size:10.5pt">配合旅行社对此采取的补救措施和相关调整。</span>
        </p>
        <p style="line-height:5.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >在旅行过程中如您发生被抢、被盗、突发急症等情况，旅行社有协助您报案或送医院救治的义务，但旅行社不是行政和</span>
        </p>
        <p style="line-height:4.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0.3pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:10pt">医疗机构，无法要求警察局和医院必须执行何种的处理方法。因此产生的所有费用均需要您</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:1pt; margin:0pt">
          <a name="page25"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">自行支付，请您保留好所有的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">原始单据，如在保险范围内的，</span>
          <span style="font-family:宋体; font-size:10.5pt">可以通过保险降低损失。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">如在旅游过程中遇当地发生暴动、政变、游街示威、罢工等，请勿围观或参与。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">●</span>
          <span style="font-family:宋体; font-size:10.5pt">我们希望您在行程出发前，购买适合自己行程活动的旅游意外保险。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">最后，衷心祝愿您的旅途平安、健康、顺利、愉快</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
        <p style="line-height:2.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">以上内容请仔细阅读后签字确认，谢谢您的合作</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:11.45pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10pt">本人已阅读并完全理解上述参团须知及安全提示，并对自己的人身及财物安全负责。</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.85pt; margin:0pt">
          <a name="page26"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">附件</span>
          <span style="font-family:Calibri; font-size:10.5pt">2.</span>
          <span style="font-family:宋体; font-size:10.5pt">文明旅游倡议书</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">全体市民和旅游行业从业者：</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >旅游是一项发现美、欣赏美、享受美的活动，更是一项创造美的活动。市民在旅游活动中的一言一行，不仅体现了个</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">人的文明水平，更是一个城市文明程度的主要体现和重要标志。</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">崇义是中国最受游客喜爱的地方，更需要文明旅游。拒绝</span>
          <span style="font-family:宋体; font-size:10.5pt">“</span>
          <span style="font-family:宋体; font-size:10.5pt">到此一游</span>
          <span style="font-family:宋体; font-size:10.5pt">”</span>
          <span style="font-family:宋体; font-size:10.5pt">，倡导文明旅游，是建设转型城市的道德支</span>
        </p>
        <p style="line-height:3.65pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">撑。为此，我们向全县旅游行业和全体市民发出如下倡议：</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">一、加强学习，提高文明旅游素质</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 18.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >认真学习公民基本道德规范，学习文明礼仪，严格遵守《中国公民国内旅游行为公约》，切实掌握《中国公民出国</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">（境）旅游文明行为指南》</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">要识别不文明行为的各种表现，明辨旅游活动中的是非、美丑，不断提升思想道德境界。</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">二、加强管理，营造文明旅游环境</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">文明管理、文明执法、文明服务，杜绝粗暴执法、不规范服务等行为</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">规范经营行为，杜绝出售假冒伪劣商品，文明经</span>
        </p>
        <p style="line-height:5.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 45.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >营，诚信服务。要营造文明旅游的环境，使广大游客在旅游活动中，提升文明素养。三、积极参与，塑造文明旅游形象</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.75pt; margin:0pt 18.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">市民在旅游活动中不随地吐痰，不乱扔废弃物，不在禁烟场所吸烟</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">遵守公共秩序，不在公众场所高声交谈</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">保护文物</span>
        </p>
        <p style="line-height:1.8pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">古迹，不在文物古迹上涂刻，拍照摄像遵守规定</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">对身边的不文明行为及时劝阻</span>
          <span style="font-family:Calibri; font-size:10.5pt">;</span>
          <span style="font-family:宋体; font-size:10.5pt">不长时间占</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">用公共设施，尊重服务人员的</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">劳动，尊重各地风俗习惯。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">文明旅游，从我做起，从现在做起</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
          <span style="font-family:宋体; font-size:10.5pt">希望全县旅游行业从业人员及广大市民，无论是在崇义，还是在外地，时刻把</span>
          <span style="font-family:宋体; font-size:10.5pt">“</span>
          <span style="font-family:宋体; font-size:10.5pt">文</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">明</span>
          <span style="font-family:宋体; font-size:10.5pt">”</span>
          <span style="font-family:宋体; font-size:10.5pt">记在心里，落实在行动中，因为你就代表着崇义</span>
          <span style="font-family:Calibri; font-size:10.5pt">!</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.85pt; margin:0pt">
          <a name="page27"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">附件</span>
          <span style="font-family:Calibri; font-size:10.5pt">3.</span>
        </p>
        <p style="line-height:2.4pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">中国公民国内旅游文明行为公约</span>
        </p>
        <p style="line-height:5.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13pt; margin:0pt 13.3pt 0pt 18pt">
          <span
            style="font-family:宋体; font-size:10.5pt"
          >营造文明、和谐的旅游环境，关系到每位游客的切身利益。做文明游客是我们大家的义务，请遵守以下公约：</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">1</span>
          <span style="font-family:宋体; font-size:10.5pt">、维护环境卫生。不随地吐痰和口香糖，不乱扔废弃物，不在禁烟场所吸烟。</span>
        </p>
        <p style="line-height:2.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 12.3pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">2</span>
          <span style="font-family:宋体; font-size:10.5pt">、遵守公共秩序。不喧哗吵闹，排队遵守秩序，不并行挡道，不在公众场所高声交谈。</span>
          <span style="font-family:Calibri; font-size:10.5pt">3</span>
          <span style="font-family:宋体; font-size:10.5pt">、保护生态环境。不踩踏绿</span>
        </p>
        <p style="line-height:3.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:12pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:10.5pt">地，不摘折花木和果实，不追捉、投打、乱喂动物。</span>
        </p>
        <p style="line-height:3.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">4</span>
          <span style="font-family:宋体; font-size:10.5pt">、保护文物古迹。不在文物古迹上涂刻，不攀爬</span>
          <span style="font-family:宋体; font-size:10.5pt">触摸文物，拍照摄像遵守规定。</span>
        </p>
        <p style="line-height:2.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 29.3pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">5</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >、爱惜公共设施。不污损客房用品，不损坏公用设施，不贪占小便宜，节约用水用电，用餐不浪费。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 39.3pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">6</span>
          <span
            style="font-family:宋体; font-size:10.5pt"
          >、尊重别人权利。不强行和外宾合影，不对着别人打喷嚏，不长期占用公共设施，尊重服务人员的劳动，尊重各民族宗教习俗。</span>
        </p>
        <p style="line-height:3.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.85pt; margin:0pt 29.3pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">7</span>
          <span style="font-family:宋体; font-size:10.5pt">、讲究以礼待人。衣着整洁得体，不在公共场所袒胸赤膊；礼让老幼病残，礼让女士；不讲粗话。</span>
        </p>
        <p style="line-height:3.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.35pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:Calibri; font-size:10.5pt">8</span>
          <span style="font-family:宋体; font-size:10.5pt">、提倡健康娱乐。抵制封建迷信活动，拒绝黄、赌、毒</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:0.4pt; margin:0pt">
          <a name="page28"></a>
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:27.4pt; margin:0pt 0pt 0pt 54pt">
          <span style="font-family:宋体; font-size:24pt">《中国公民国内旅游文明协议书》</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.55pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 0pt 0pt 60pt">
          <span style="font-family:宋体; font-size:14pt">营造文明、和谐的旅游环境，关系到每位游客的切身利益。</span>
        </p>
        <p style="line-height:2.2pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 0pt 0pt 18pt">
          <span style="font-family:宋体; font-size:14pt">做文明游客是我们大家的义务，请遵守以下公约：</span>
        </p>
        <p style="line-height:14.15pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">1</span>
          <span style="font-family:宋体; font-size:14pt">、维护环境卫生。不随地吐痰和口香糖，不乱扔废弃物，不在禁烟场所吸烟。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">2</span>
          <span style="font-family:宋体; font-size:14pt">、遵守公共秩序。不喧哗吵闹，排队遵守秩序，不并行挡道，不在公众场所高声交谈。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 6.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">3</span>
          <span style="font-family:宋体; font-size:14pt">、保护生态环境。不踩踏绿地，不摘折花木和果</span>
          <span style="font-family:宋体; font-size:14pt"></span>
          <span style="font-family:宋体; font-size:14pt">实，不追捉、投打、乱喂动物。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">4</span>
          <span style="font-family:宋体; font-size:14pt">、保护文物古迹。不在文物古迹上涂刻，不攀爬触摸文物，拍照摄像遵守规定。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">5</span>
          <span style="font-family:宋体; font-size:14pt">、爱惜公共设施。不污损客房用品，不损坏公用设施，不贪占小便宜，节约用水用电，用餐不浪费。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:13.5pt">6</span>
          <span
            style="font-family:宋体; font-size:13.5pt"
          >、尊重别人权利。不强行和外宾合影，不对着别人打喷嚏，不长期占用公共设施，尊重服务人员的劳动，尊重各民族宗教习俗。</span>
        </p>
        <p style="line-height:14.25pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.05pt; margin:0pt 20.3pt 0pt 18pt; text-indent:28pt">
          <span style="font-family:宋体; font-size:14pt">7</span>
          <span style="font-family:宋体; font-size:14pt">、讲究以礼待人。衣着整洁得体，不在公共场所袒胸赤膊；礼让老幼病残，礼让女士；不讲粗话。</span>
        </p>
        <p style="line-height:12.3pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 2.3pt 0pt 0pt; text-align:center">
          <span style="font-family:宋体; font-size:14pt">8</span>
          <span style="font-family:宋体; font-size:14pt">、提倡健康娱乐。抵制封建迷信活动，拒绝黄、赌、毒。</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10.35pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16pt; margin:0pt 0pt 0pt 279pt">
          <span style="font-family:宋体; font-size:14pt">中央文明办</span>
          <span
            style="width:13pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:362pt"
          ></span>
          <span style="font-family:宋体; font-size:14pt">国家旅游局</span>
        </p>
      </div>
      <br style="clear:both; mso-break-type:section-break; page-break-before:always">
      <div>
        <p style="line-height:13.15pt; margin:0pt">
          <a name="page29"></a>
          <span style="font-family:宋体; font-size:11.5pt">全国统一旅游电子合同编号：</span>
          <span
            style="width:217.75pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:367.25pt"
          >{{allData.ERPContractId}}</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">国家旅游咨询投诉热线</span>
          <span style="color:#0d0d0d; font-family:宋体; font-size:11.5pt">12301</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:16.6pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:11.5pt">游客签字：</span>
          <span
            style="width:210.5pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:268pt"
          ></span>
          <span style="font-family:宋体; font-size:11.5pt">旅行社盖章：</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.5pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt 0pt 0pt 88pt">
          <span style="color:#ffffff; font-family:宋体; font-size:11.5pt">USER_SIGN</span>
          <span
            style="width:239.25pt; text-indent:0pt; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:379pt"
          ></span>
          <span style="color:#ffffff; font-family:宋体; font-size:11.5pt">AG_STAMP</span>
        </p>
        <p style="line-height:1pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:10pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:14.9pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:6pt">
          <tr style="height:13.1pt">
            <td colspan="2" style="vertical-align:bottom; width:215pt">
              <p style="line-height:13.15pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">证件号码：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:172pt">
              <p style="line-height:13.15pt; margin:0pt 0pt 0pt 48pt">
                <span style="font-family:宋体; font-size:11.5pt">经办人：</span>
              </p>
            </td>
          </tr>
          <tr style="height:23.8pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:191pt">
              <p style="margin:0pt">
                <span style="font-family:'Times New Roman'; font-size:12pt">&#xa0;</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:172pt">
              <p style="line-height:13.15pt; margin:0pt 0pt 0pt 48pt">
                <span style="color:#ffffff; font-family:宋体; font-size:11.5pt">AG_SIGN</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">住</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:191pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:11.5pt">址：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:172pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 48pt">
                <span style="font-family:宋体; font-size:11.5pt">营业地址：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td colspan="2" style="vertical-align:bottom; width:215pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">联系电话：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:172pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 48pt">
                <span style="font-family:宋体; font-size:11.5pt">联系电话：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">传</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:191pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:11.5pt">真：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:71pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 48pt">
                <span style="font-family:宋体; font-size:11.5pt">传</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:101pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 13pt">
                <span style="font-family:宋体; font-size:11.5pt">真：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td style="vertical-align:bottom; width:24pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">邮</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:191pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 12pt">
                <span style="font-family:宋体; font-size:11.5pt">编：</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:71pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 48pt">
                <span style="font-family:宋体; font-size:11.5pt">邮</span>
              </p>
            </td>
            <td style="vertical-align:bottom; width:101pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 13pt">
                <span style="font-family:宋体; font-size:11.5pt">编：</span>
              </p>
            </td>
          </tr>
          <tr style="height:13.05pt">
            <td colspan="2" style="vertical-align:bottom; width:215pt">
              <p style="line-height:13.05pt; margin:0pt">
                <span style="font-family:宋体; font-size:11.5pt">电子邮箱：</span>
              </p>
            </td>
            <td colspan="2" style="vertical-align:bottom; width:172pt">
              <p style="line-height:13.05pt; margin:0pt 0pt 0pt 48pt">
                <span style="font-family:宋体; font-size:11.5pt">电子邮箱：</span>
              </p>
            </td>
          </tr>
          <tr style="height:0pt">
            <td style="width:24pt; border:none"></td>
            <td style="width:191pt; border:none"></td>
            <td style="width:71pt; border:none"></td>
            <td style="width:101pt; border:none"></td>
          </tr>
        </table>
        <p style="line-height:10.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:11.5pt">签约地点：</span>
        </p>
        <p style="line-height:10.7pt; margin:0pt">
          <span style="font-family:'Times New Roman'; font-size:10pt">&#xa0;</span>
        </p>
        <p style="line-height:13.15pt; margin:0pt">
          <span style="font-family:宋体; font-size:11.5pt">全国旅游投诉服务热线：</span>
          <span style="font-family:宋体; font-size:11.5pt">12301</span>
        </p>
      </div>
    </div>
  </div>
</template>  
<script>
import { getOrderContractDetail } from "src/api/order";
import { contract_data } from "@/configuration/orderMap";
import { lineOrderSaleOrderPreviewContract } from "@/api/touristroute";
import { templateList } from "@/configuration/orderMap";

export default {
  name: "preview",
  props: {
    id: "",
    type: "",
    requestType: {
      default: "1"
    }
  },
  data() {
    return {
      allData: JSON.parse(JSON.stringify(contract_data))
    };
  },
  computed: {
    Ctype() {
      return this.type ||
        this.$route.query.type ||
        this.allData.templateId == "C00001"
        ? 2
        : 1;
    }
  },
  filters: {
    getOrderPayType(code) {
      let status = code * 1;
      let str = "";
      switch (status) {
        case 0:
          str = "未支付";
          break;
        case 1:
          str = "支付宝";
          break;
        case 2:
          str = "微信";
          break;
        case 3:
          str = "其他";
          break;
      }
      return str;
    }
  },
  methods: {
    getOrderDetail() {
      let params = {
        order_no: this.id || this.$route.query.id, //老的要订单号
        order_id: this.id || this.$route.query.id //新的要订单id
      };
      if (this.requesttype != "1") {
        lineOrderSaleOrderPreviewContract(params).then(res => {
          console.log({ res });
          let { code, data, msg } = res;
          if (code == 0) {
            this.allData = data.contract_data;
          } else {
            this.$message.error(msg);
          }
        });
      } else {
        getOrderContractDetail({
          params: {
            data: params
          },
          success: res => {
            let data = res.data;
            if (data.code == 0) {
              this.allData = data.data;
            } else {
              this.$message.error(data.msg);
            }
          }
        });
      }
    }
  },
  mounted() {
    this.getOrderDetail();
  }
};
</script>
<style >
/* table td{
    border:1px solid
}
     */
</style>
<style scoped lang="less">
.box {
  max-width: 700px;
  margin: 0 auto;
}
</style>


