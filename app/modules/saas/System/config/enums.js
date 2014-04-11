(function() {
	'use strict';
	define([], function() {
		var $enums = function() {
			var enums = {
				none: 'NONE',
				constraints: 'CONSTRAINTS',

				features: {
					// Application Role
					// SM_APP_ROLE_GET: 'SM_APPLICATION_ROLE_GET',
					// SM_APP_ROLE_CREATE: 'SM_APPLICATION_ROLE_CREATE',
					// SM_APP_ROLE_UPDATE: 'SM_APPLICATION_ROLE_UPDATE',
					// SM_APP_ROLE_DELETE: 'SM_APPLICATION_ROLE_DELETE',
					// SM_APP_ROLE_FEATURES: 'SM_APPLICATION_ROLE_FEATURES',


					// Invoice
					EF_INVOICE_GET: 'EF_INVOICE_GET',
					EF_INVOICE_SHARE: 'EF_INVOICE_SHARE',
					EF_INVOICE_UPDATE: 'EF_INVOICE_UPDATE',
					EF_INVOICE_DELETE: 'EF_INVOICE_DELETE',
					EF_INVOICE_CREATE: 'EF_INVOICE_CREATE',

					// // User
					// SM_USER_GET: 'SM_USER_GET',
					// SM_USER_UPDATE: 'SM_USER_UPDATE',
					// SM_USER_ROLES: 'SM_USER_ROLES',
					// SM_USER_A_GET: 'SM_USER_ADMIN_GET',
					// SM_USER_A_DELETE: 'SM_USER_ADMIN_DELETE',


					// // Custmer
					// SM_CUSTOMER_GET: 'SM_CUSTOMER_GET',
					// SM_CUSTOMER_CREATE: 'SM_CUSTOMER_CREATE',
					// SM_CUSTOMER_UPDATE: 'SM_CUSTOMER_UPDATE',
					// SM_CUSTOMER_DELETE: 'SM_CUSTOMER_DELETE',
					// SM_CUSTOMER_MANAGE_USERS: 'SM_CUSTOMER_MANAGE_USERS',
				},

				invoiceList: {
					exposed: 'exposed',
					received: 'received',
					rejected: 'rejected',
					all: 'all',
					pending: 'pending'
				},

				accessType: {
					reject: 'reject',
					accept: 'accept'
				},

				invoice: {
					dType: {
						pdf: 'PDF',
						edi: 'EDI'
					},
					bsType: {
						ISSUER: 'ISSUER',
						SUPPLIER: 'SUPPLIER',
						BUYER: 'BUYER',
						INVOICE_RECEIVER: 'INVOICE_RECEIVER',
						RECEIVER: 'RECEIVER'
					},

					type: {
						VAT: 'VAT'
					},

					date: {
						ISSUE_DATE: 'ISSUE_DATE',
						SELL_DATE: 'SELL_DATE',
						PAYMENT_DATE: 'PAYMENT_DATE',
						INVOICE_DATE: 'INVOICE_DATE'
					},

					idNumber: {
						NIP_NUMBER: 'NIP_NUMBER'
					},

					PRICE_STRING: 'PRICE_STRING',
					ADDITIONAL_TERMS: 'ADDITIONAL_TERMS',
					QUANTITY: 'QUANTITY',

					units: {
						METERS: 'METERS',
						SQUARE_METERS: 'SQUARE_METERS',
						KILOGRAMS: 'KILOGRAMS',
						LITERS: 'LITERS',
						PIECES: 'PIECES',
						PAIRS: 'PAIRS',
						TONS: 'TONS'
					},

					invoiceValue: {
						VAT: 'VAT',
						NETTO: 'NETTO',
						BRUTTO: 'BRUTTO',
						TAX: 'TAX',
						TAXED_PRICE: 'TAXED_PRICE',
						PRODUCT_NETTO: 'PRODUCT_NETTO',
						PRODUCT_VALUE: 'PRODUCT_VALUE',
					},

					tax: {
						VAT: 'VAT'
					},

					accessType: {
						OWNER: 'OWNER',
						VIEWER: 'VIEWER',
						VIEWER_PENDING: 'VIEWER_PENDING',
						VIEWER_ACCEPTED: 'VIEWER_ACCEPTED',
						VIEWER_REJECTED: 'VIEWER_REJECTED'
					}

				},

				paymentPending: 'PENDING',
				paymentSuccess: 'SUCCESSFUL',
				paymentCancel: 'CANCEL',
				paymentRejected: 'REJECTED',

				paymentTypeSubscription: 'SUBSCRIPTION',

				timePeriod: {
					week: 'week',
					month: 'month',
					quarter: 'quarter',
					year: 'year'
				},

				successMessage: 'successMessage',
				warningMessage: 'warningMessage',
				errorMessage: 'errorMessage',


				constraintsClass: {
					over: 'constraintsOver',
					near: 'constraintsNear',
					ok: ''
				}

			};

			return enums;
		};
		return [$enums];
	});
}());
