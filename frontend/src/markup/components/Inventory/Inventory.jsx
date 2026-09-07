import React, { useState } from 'react';
import styles from './inventory.module.css';

const initialInventoryData = [
  { id: 1, name: 'Bath Towels', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100', category: 'Linen', status: 'Available', stock: 120, reorder: 50 },
  { id: 2, name: 'Shampoo Bottles', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100', category: 'Toiletries', status: 'Low', stock: 20, reorder: 100 },
  { id: 3, name: 'Coffee Pods', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100', category: 'Refreshments', status: 'Out of Stock', stock: 0, reorder: 200 },
  { id: 4, name: 'Room Key Cards', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100', category: 'Electronics', status: 'Available', stock: 500, reorder: 100 },
  { id: 5, name: 'Cleaning Supplies', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=100', category: 'Housekeeping', status: 'Available', stock: 300, reorder: 50 },
  { id: 6, name: 'Mini Bar Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=100', category: 'Refreshments', status: 'Low', stock: 15, reorder: 50 },
  { id: 7, name: 'Bed Linens', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100', category: 'Linen', status: 'Available', stock: 80, reorder: 30 },
  { id: 8, name: 'Bathrobes', image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=100', category: 'Linen', status: 'Low', stock: 10, reorder: 50 },
  { id: 9, name: 'Slippers', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=100', category: 'Guest Comfort', status: 'Available', stock: 150, reorder: 50 },
  { id: 10, name: 'Water Bottles', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100', category: 'Refreshments', status: 'Available', stock: 200, reorder: 100 },
  { id: 11, name: 'Kettle', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=100', category: 'Kitchen', status: 'Out of Stock', stock: 0, reorder: 130 }
];

function Inventory() {
  const [items, setItems] = useState(initialInventoryData);
  const [selectedItems, setSelectedItems] = useState([3]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
        return styles.badgeAvailable;
      case 'Low':
        return styles.badgeLow;
      case 'Out of Stock':
        return styles.badgeOutOfStock;
      default:
        return '';
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Inventory</h4>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className={`rounded-circle ${styles.userAvatar}`}
                width="36"
                height="36"
                alt="Admin"
              />
              <div>
                <div className="fw-bold" style={{ fontSize: '0.85rem' }}>
                  Jaylon Dorwart
                </div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  Admin
                </div>
              </div>
            </div>
            <i className={`bi bi-gear fs-5 text-muted ${styles.iconBtn}`}></i>
            <i className={`bi bi-bell fs-5 text-muted ${styles.iconBtn}`}></i>
          </div>
        </div>

        {/* Main Card */}
        <div className={styles.cardCustom}>
          {/* Filter and Control Bar */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div className={styles.searchWrapper}>
              <i className={`bi bi-search ${styles.searchIcon}`}></i>
              <input
                type="text"
                className={`form-control ${styles.searchInput}`}
                placeholder="Search item, category, etc"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                Sort by:
              </span>
              <button type="button" className={`btn ${styles.btnFilterDropdown}`}>
                Newest <i className="bi bi-chevron-down ms-1"></i>
              </button>
              <button type="button" className={`btn ${styles.btnFilterDropdown}`}>
                <i className="bi bi-funnel"></i> All Category{' '}
                <i className="bi bi-chevron-down ms-1"></i>
              </button>
              <button type="button" className={`btn ${styles.btnAddItem}`}>
                + Add Item
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="table-responsive">
            <table className={`table table-hover align-middle ${styles.table}`}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      className={`form-check-input ${styles.checkboxCustom}`}
                      type="checkbox"
                      checked={
                        selectedItems.length === filteredItems.length &&
                        filteredItems.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>
                    Item <i className="bi bi-arrow-down-up"></i>
                  </th>
                  <th>
                    Category <i className="bi bi-arrow-down-up"></i>
                  </th>
                  <th>
                    Availability <i className="bi bi-arrow-down-up"></i>
                  </th>
                  <th>
                    Quantity in Stock <i className="bi bi-arrow-down-up"></i>
                  </th>
                  <th>
                    Quantity in Reorder <i className="bi bi-arrow-down-up"></i>
                  </th>
                  <th>
                    Action <i className="bi bi-arrow-down-up"></i>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        className={`form-check-input ${styles.checkboxCustom}`}
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.image}
                          className={styles.itemThumbnail}
                          alt={item.name}
                        />
                        <span className="fw-bold">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{item.category}</td>
                    <td>
                      <span
                        className={`${styles.badgeStatusPill} ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="fw-bold">{item.stock}</td>
                    <td className="text-muted">{item.reorder}</td>
                    <td>
                      <a
                        href="#view-detail"
                        className="text-decoration-none text-dark fw-bold me-2"
                        style={{ fontSize: '0.8rem' }}
                      >
                        View Detail
                      </a>
                    </td>
                    <td>
                      <button type="button" className={`btn ${styles.btnReorder}`}>
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              Showing 1-11 of 535
            </span>
            <ul className="pagination pagination-sm m-0 gap-1">
              <li className="page-item disabled">
                <a className="page-link border-0 text-muted" href="#">
                  <i className="bi bi-chevron-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a
                  className={`page-link border-0 ${styles.pageLinkActive}`}
                  href="#"
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <span className="page-link border-0 text-muted">...</span>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">
                  8
                </a>
              </li>
              <li className="page-item">
                <a className="page-link border-0 text-dark" href="#">
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;