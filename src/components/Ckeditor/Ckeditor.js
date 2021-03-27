import {VueEditor} from "vue2-editor";
import "quill-mention-vue2-editor";
import axios from "axios";


const atValues = [
    {id: 1, value: '<a href="https://www.youtube.com/">nguyenHoang</a>', display: '<img src="https://gamek.mediacdn.vn/133514250583805952/2020/8/6/rtd1-1596712458074488543564.jpg" alt=""/> Hoang'},
    {id: 2, value: '<a href="https://www.youtube.com/">NguyenDuy</a>', display: '<img src="https://gamek.mediacdn.vn/133514250583805952/2020/8/6/rtd1-1596712458074488543564.jpg" alt=""/> Duy'}
];

export default {
    name: "Ckeditor",
    components: {
        VueEditor
    },
    data() {
        return {
            content: "",
            casesData: [],
            casesOption: {
                content: '',
            },
            editorSettings: {
                modules: {
                    mention: {
                        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                        mentionDenotationChars: ["@"],
                        renderItem: (item) => {
                            return item.display;
                        },
                        source: function (searchTerm, renderList) {
                            let values;

                            values = atValues;

                            if (searchTerm.length === 0) {
                                renderList(values, searchTerm);
                            } else {
                                const matches = [];
                                for (let i = 0; i < values.length; i++)
                                    if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
                                renderList(matches, searchTerm);
                            }
                        },
                    },
                }
            }
        };
    },
    async mounted() {
        await this._loadData();
        const lastItem = this.casesData.length - 1;
        this.casesOption.content = this.casesData[lastItem]?.content;

    },
    methods: {
        _loadData: function () {
            return axios.get(`https://5fe01c7deca1780017a311db.mockapi.io/update-case`)
                .then((response) => this.casesData = response.data)
                .catch(error => console.log(error))
        },
        _onSubmit: function () {
            axios.post(`https://5fe01c7deca1780017a311db.mockapi.io/update-case`, this.casesOption)
                .then((response) => console.log(response))
                .catch(error => console.log(error))
        },
        _onClickRemoveTag: function () {
            console.log(1)
        }
    }
}
