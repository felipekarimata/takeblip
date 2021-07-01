const express = require('express');
const app = express();
const axios = require('axios');
let port = process.env.PORT || 3000;
app.use(express.json());

app.get('/takeblip', async (req, res) => {
    try {
        let info = {}
        let list = []
        const { data } = await axios.get('https://api.github.com/users/takenet/repos?&type=public&sort=created&direction=asc&per_page=50')
        const formate = data.filter(repository => repository.language == 'C#')
        for (let i = 0; i < 5; i++) {
            info = {
                full_name: formate[i].full_name,
                name: formate[i].name,
                avatar_link: formate[i].owner.avatar_url,
                description: formate[i].description,
                created: formate[i].created_at
            }
            list.push(info)
        }
        return res.status(200).json(list)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error"})
    }   
})
app.listen(port, () => {
    console.log('Server On');
}
);
