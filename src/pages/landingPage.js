import React from 'react';
import Card from '../components/card'
import axios from 'axios';
import { URL_API } from '../helper';
// Penulisan class component
class LandingPage extends React.Component {
    // untuk menyimpan data state
    constructor(props) {
        super(props);
        this.state = {
            content: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
            count: 0,
            dataEmail: [],
            datAlbum: []
        }
    }
    // component life cycle
    /**
     * componentWillMount() : fungsi yg berjalan sebelum component dirender
     * componentDidMount() : fungsi yg berjalan setelah component dirender, untuk proses pemanggilan URL_API atau deklarasi state diawal render
     * componentDidUpdate() : fungsi yg berjalan setelah component render yg bersifat stand by.
     */
    componentDidMount() {
        // masukkan fungsi yang akan dijalankan
        this.getDataAlbum()
        // deklarsi state
    }

    getDataAlbum = () => {
        // fungsi untuk mengambil data dari API
        axios.get(URL_API + '/tb_album')
            .then((res) => {
                // jika mendapat respon success
                console.log("respon api get :", res.data)
                // menyimpan data dari respon server ke dalam this.state
                this.setState({ datAlbum: res.data })
            })
            .catch((err) => {
                // jika mendapat respon error
                console.log(err)
            })
    }

    onBtAdd = () => {
        let title = this.inputTitle.value
        let description = this.inputDescription.value
        let image = this.inputImage.value
        console.log(title, description, image)

        axios.post(URL_API+'/tb_album', {
            title, description, image
        })
            .then((res) => {
                console.log('respon POST :', res.data)
                // Cara 1
                // this.state.datAlbum.push(res.data)
                // this.setState({ datAlbum: this.state.datAlbum })

                // Cara 2
                this.getDataAlbum()
            })
            .catch(err => {
                console.log('ERROR POST :', err)
            })
    }

    // tempat membuat fungsi
    printCard = () => {
        let { datAlbum } = this.state
        return datAlbum.map((item, index) => {
            return <Card title={item.title}
                description={item.description} image={item.image} />
        })
    }
    // tempat membuat tampilan
    render() {
        console.log('dataAlbum awal', this.state.datAlbum)
        return (
            <div style={{ backgroundColor: '#F8F9FA' }}>
                <div className="jumbotron mb-2 row" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-6">
                        <div style={{ width: '90%' }} className="m-auto">
                            <h1 className="display-4">Album Example</h1>
                            <p className="lead">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet,
                        but not too short so folks don’t simply skip over it entirely.</p>
                            <button className="btn btn-primary btn-lg">Your Album</button><button className="btn btn-secondary btn-lg">Their Album</button>
                        </div>
                    </div>
                    <div className="col-md-6 p-4 bg-dark text-white text-left">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" ref={elemen => this.inputTitle = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" id="description" aria-describedby="emailHelp" ref={elemen => this.inputDescription = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Link Image</label>
                                <input type="text" className="form-control" id="img" aria-describedby="emailHelp" ref={elemen => this.inputImage = elemen} />
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary float-right" onClick={this.onBtAdd}>Add Data</button>
                    </div>
                </div>
                <div className="row container m-auto">
                    {/* props = mentransfer data dari parent component ke child component */}
                    {/* <Card title={'Title from props'} /> */}
                    {this.printCard()}
                </div>
            </div>
        );
    }
}

export default LandingPage;