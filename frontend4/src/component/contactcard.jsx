import {AiFillPhone, AiOutlineMail} from 'react-icons/ai'
import {connect} from 'react-redux'
import {Deletecontact, UpdateContact, Addintocontact} from '../actions/contactActions'

function ContactCard({contactitem, Deletecontact, Contact, auth , UpdateContact, Addintocontact}) {
    const {name, phone, email, type} = contactitem

    const onClick = (e) => {
        console.log('hello')
        Addintocontact(contactitem)
    }

    return (
        <div className="card card-side w-3/4 mx-auto bg-zinc-200 shadow-xl my-4">
            <div className="card-body">
                <h2 className="card-title my-2">{name}</h2>
                <p className="text-lg font-bold my-2 flex inline-flex items-center "> <AiOutlineMail className='mx-2'/> {email}</p>
                <p className="text-lg my-2 flex inline-flex items-center"><AiFillPhone className='mx-2'></AiFillPhone> {phone}</p>
                <div className='badge badge-primary py-2 px-4'>{type}</div>
            </div>
            <div className="card-actions items-center justify-center flex-col flex">
                    <button onClick={() => Deletecontact(auth.user.token, contactitem._id)} className="btn btn-primary my-4 mx-6">Delete</button>
                    <button onClick={onClick} className="btn btn-primary my-4 mx-6">update</button>
            </div>
        </div>
    )
}

const mapsPropstoState = state => ({
    auth: state.auth,
    Contact: state.Contact
})


export default connect(mapsPropstoState, {Deletecontact , UpdateContact, Addintocontact})(ContactCard)