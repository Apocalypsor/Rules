const data = $response.body;
const obj = JSON.parse(data);

try {
    for (let pageNum in obj.pages) {
        let newSections = []
        for (let section of obj.pages[pageNum].screen.sections) {
            if (section.containerType === 'ad') continue;
            if (section.containers.filter(item => item.contentType === 'VersatileDealCard')) continue;
            section.containers = section.containers.filter(item => {
                if (item.value.flag && item.value.flag.flagText === 'PROMOTED') return false;
                if (item.value.storeName.includes('Advertiser')) return false;
                return true;
            });
            section.headline = null;
            newSections.push(section);
        }
        obj.pages[pageNum].screen.sections = newSections;
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log(e);
    $done({ body: data });
}
