# Data Source

The source data is composed in Excel - [500samah.xlsx](500samah.xlsx). 
The Rich Text is converted to html using this [Excel Macro](http://stackoverflow.com/questions/33620147/convert-rich-text-to-html-formatting-tags/33796622#33796622).

The conversion takes forever, even if you try to open the file after it is ready. 
Because of this we have created a simple file [500samah-values.xlsx](500samah-values.xlsx). 

# Data Structure
There are now column names. Concatenation is used to create html output for bootstrap based page. 
Every row is a div with class row.

|Column|What   |Expl   |Formula|
|------|-------|-------|----|
|A     |title  |Chuvash word|   |
|B     |sound  |Pronounciation, Russian based simplified notation|   |
|C     |meaning|Translation into Russian|   |
|D     |desc   |Examples and Description   |   |
|D     |row    |Row output in html|=SAMMANFOGA("&lt;div class='row entry' id='";A1;"'&gt;";"&lt;div class='col-md-3'&gt;&lt;div class='title'&gt;&lt;a href='#";A1;"'&gt;";A1;"&lt;/a&gt;&lt;/div&gt;&lt;div class='sound'&gt;";B1;"&lt;/div&gt;&lt;div class='meaning'&gt;";C1;"&lt;/div&gt;&lt;/div&gt;&lt;div class='col-md-9 desc'&gt;";D1;"&lt;/div&gt;&lt;/div&gt;")|


The formula was: SAMMANFOGA("&lt;div class='row entry'&gt;";"&lt;div class='col-md-2 title'&gt;";A1;"&lt;/div&gt;&lt;div class='col-md-2 sound'&gt;";B1;"&lt;/div&gt;&lt;div class='col-md-3 meaning'&gt;";C2;"&lt;/div&gt;&lt;div class='col-md-5 desc'&gt;";D1;"&lt;/div&gt;&lt;/div&gt;") 

# Data Renewal
When the source is updated, make the step again as described above. In the end, find and replace all latin diacritis to their Cyrillic counterparts (ӑӗҫӳ).
