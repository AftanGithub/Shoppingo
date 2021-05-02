import React from 'react'

const CategoryForms = ({handleSubmit,name,setName})=>(
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              required
              placeholder="Enter Updated Category name "
            />
            <br />
            <button className="btn btn-outline-primary">Save</button>
          </div>
        </form>
);

export default CategoryForms;
