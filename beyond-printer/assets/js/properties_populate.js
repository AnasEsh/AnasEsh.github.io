async function populateProperties(){
const properties=await fetch('./assets/jsonData/properties_descriptor.json').then(d=>d.json()).then(d=>d['sections']);
const tables=document.querySelectorAll('table[data-sectionName]');
for(const table of tables){
    const data=properties[table.getAttribute('data-sectionName')];
    const headerLabels=data['header'];
    table.tHead.innerHTML=
    `<tr>
    ${headerLabels.map(h=>`<th class="text-bg-secondary" scope="col">${h}</th>`).join('')}
    </tr>`
    //trs
    const tbodyRows=data['properties']
    .map(prop=>"<tr>"+headerLabels.map(headerLabel=>`<td>${prop[headerLabel].replaceAll('\n',"<br>")}</td>`).join('')+"</tr>"
    );
    table.tBodies[0].innerHTML=tbodyRows.join('');
}
}
window.addEventListener('load',populateProperties);