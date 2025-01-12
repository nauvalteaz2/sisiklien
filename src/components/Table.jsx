import React from 'react';
import Button from './Button';

const Table = ({ data, onEdit, onDelete, onDetail }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Report Title</th>
            <th className="py-3 px-4 text-left">Report Detail</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-4">{item.title}</td>
              {/* Atur panjang teks dengan break-words */}
              <td className="py-3 px-4 break-words max-w-md">{item.report}</td>
              <td className="py-3 px-4 space-x-2">
                <Button
                  style="warning"
                  text="Edit"
                  onClick={() => onEdit(index)}
                />
                <Button
                  style="danger"
                  text="Delete"
                  onClick={() => onDelete(index)}
                />
                <Button
                  style="success"
                  text="Detail"
                  onClick={() => onDetail(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
