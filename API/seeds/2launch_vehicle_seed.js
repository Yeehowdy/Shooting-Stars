/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_vehicle').del()
  await knex('launch_vehicle').insert([
    {name: 'Falcon 9', img:'https://hips.hearstapps.com/hmg-prod/images/in-this-spacex-handout-image-a-falcon-9-rocket-carrying-the-news-photo-1591219555.jpg'},
    {name: 'Delta-IV Heavy', img:'https://bloximages.chicago2.vip.townnews.com/lompocrecord.com/content/tncms/assets/v3/editorial/1/91/191e139e-c829-5d6d-8922-b188b3c44503/6018b16ec773b.image.jpg'},
    {name: 'Falcon Heavy', img: 'https://cdn.mos.cms.futurecdn.net/fnfyE7cDwV9JWCopNK8Ycb-1200-80.jpg'},
    {name: 'Atlas V', img: 'http://www.nasa.gov/sites/default/files/atlas_v.jpg'},
    {name: 'New Glenn', img: 'https://cdn.arstechnica.net/wp-content/uploads/2017/07/newglenn-launch.png'},
    {name: 'Soyuz', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg'},
    {name: 'Electron', img: 'https://techcrunch.com/wp-content/uploads/2019/11/EKM2M7VVAAAx8CU.jpeg'},
    {name: 'Antares', img: 'https://www.teslarati.com/wp-content/uploads/2022/08/Antares-330-render-Firefly-Northrop-Grumman-1-crop-c.jpg'},
    {name: 'Gaganyaan', img: 'https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/GSLV_MK_III_750.jpg?itok=NezzjZle'},
    {name: 'Long March 5B', img: 'https://everydayastronaut.com/wp-content/uploads/2021/04/china-long-march-5-rocket.jpg'},
    {name: 'Long March 11', img: 'https://www.spacetechasia.com/wp-content/uploads/2017/08/longmarch11-1.jpg'},
    {name: 'Long March 3B', img: 'https://storage.googleapis.com/nextspaceflight/media/rockets/8956.jpg'},
    {name: 'Long March 7', img: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Long_March_7_Y6.jpg'},
    {name: 'Proton', img: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Proton_Zvezda_crop.jpg'},
    {name: 'Long March 5', img: 'https://everydayastronaut.com/wp-content/uploads/2021/04/china-long-march-5-rocket.jpg'},
    {name: 'Vulcan Centaur', img: 'https://cdn.mos.cms.futurecdn.net/DS5EfZvJMVjaosK4aHmpNJ-1200-80.jpg'},
    {name: 'New Shepard', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/New_shepard_launch_june_19_2016.jpg/1200px-New_shepard_launch_june_19_2016.jpg'},
    {name: 'SLED-9', img: 'https://i.ytimg.com/vi/yDRJItKqClk/maxresdefault.jpg'}
  ]);
};
