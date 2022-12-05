const data = $response.body;
const obj = JSON.parse(data);

try {
    for (let pageNum in obj.pages) {
        let newSections = []
        for (let section of obj.pages[pageNum].screen.sections) {
            if (section.containerType === 'ad') continue;
            section.containers = section.containers.filter(item => !(item.value.flag && item.value.flag.flagText === 'PROMOTED'));
            newSections.push(section);
        }
        obj.pages[pageNum].screen.sections = newSections;
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log(e);
    $done({ body: data });
}
