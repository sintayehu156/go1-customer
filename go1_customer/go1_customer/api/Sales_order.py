import frappe
from frappe import _

@frappe.whitelist()
def get_salesorder():
    salesorders = frappe.db.get_all("Sales Order", fields=['*'])
    salesorder_items = frappe.db.get_all("Sales Order Item", fields=["*"])
    salesorder_docs = []
    for salesorder in salesorders:
        items = []
        for item in salesorder_items:
            if item["parent"] == salesorder["name"]:
                items.append(item)
        salesorder["items"] = items
        salesorder_docs.append(salesorder)
        return salesorder_docs
