import frappe
from frappe import _

@frappe.whitelist()
def get_quotation():
    users_data = getcustomer()
    quotations = frappe.db.get_all("Quotation", fields=['*'], filters={'party_name': ['in', users_data]})
    quotation_items = frappe.db.get_all("Quotation Item", fields=["*"])
    quotation_docs = []

    for quotation in quotations:
        items = []
        for item in quotation_items:
            if item["parent"] == quotation["name"]:
                items.append(item)
        quotation["items"] = items
        quotation_docs.append(quotation)

    return quotation_docs

@frappe.whitelist()
def get_salesorder():
    users_data = getcustomer()
    salesorders = frappe.db.get_all("Sales Order", fields=['*'], filters={'customer': ['in', users_data]})
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

@frappe.whitelist()
def get_salesinvoice():
    user_data = getcustomer()
    salesinvoices = frappe.db.get_all("Sales Invoice", fields=['*'],filters={'customer': ['in', user_data]})
    salesinvoice_items = frappe.db.get_all("Sales Invoice Item", fields=["*"])
    salesinvoices_docs = []
    for salesorder in salesinvoices:
        items = []
        for item in salesinvoice_items:
            if item["parent"] == salesorder["name"]:
                items.append(item)
        salesorder["items"] = items
        salesinvoices_docs.append(salesorder)
    return salesinvoices_docs

@frappe.whitelist()
def get_issues():
    issue = frappe.db.get_all("Issue", fields=['*'])
    return issue

@frappe.whitelist()
def get_shipments():
   users_data = getcustomer()
   deliverynote = frappe.db.get_all("Delivery Note", fields=['*'],filters={'customer':['in',users_data]})
   deliverynote_items = frappe.db.get_all("Delivery Note Item", fields=["*"])
   deliverynote_docs = []
   for dn in deliverynote:
       items = []
       for item in deliverynote_items:
           if item["parent"] == dn["name"]:
               items.append(item)
       dn["items"] = items
       deliverynote_docs.append(dn)
   return deliverynote_docs

@frappe.whitelist()
def get_material_request():
    materialreq = frappe.db.get_all("Material Request", fields=['*'])
    materialreq_items = frappe.db.get_all("Material Request Item", fields=["*"])
    materialreq_docs = []
    for mr in materialreq:
        items = []
        for item in materialreq_items:
            if item["parent"] == mr["name"]:
                items.append(item)
        mr["items"] = items
        materialreq_docs.append(mr)
    return materialreq_docs

@frappe.whitelist()
def get_username():
   current_user=frappe.session.user
   user_detail = frappe.get_all("User", filters={'name': current_user}, fields=['full_name'])
   return user_detail[0].full_name



@frappe.whitelist()
def get_logged_user():
    user_details = frappe.get_all("User", filters={'name': frappe.session.user}, fields=['full_name'])
    return user_details[0].full_name

@frappe.whitelist()
def get_navbar_routes():
    check=frappe.get_single('Go1 Navbar Settings')
    user_details = frappe.get_all("Go1 Navbar Item", filters={'parent': 'Go1 Navbar Settings','enabled':1}, fields=['*'])
    return user_details

@frappe.whitelist()
def get_userid():
    return frappe.session.user


@frappe.whitelist()
def getcustomer():
    user_check = get_userid()
    customers = frappe.db.get_all("Customer", fields=['name'])
    customer_portal_details = []
    customers_details = []

    for customer in customers:
        portal_users = frappe.db.get_all("Portal User", filters={'parent': customer['name']}, fields=['user'])
        for portal_user in portal_users:
            if portal_user['user'] == user_check:
                customer_portal_details.append({
                    'customer': customer,
                    'portal_users': portal_users
                })

    for detail in customer_portal_details:
        customers_details.append(detail['customer']['name'])

    return customers_details


