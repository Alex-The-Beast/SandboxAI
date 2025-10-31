import { useState, useEffect } from "react";
import { getAllContacts, addContacts } from "../../api/contact";
import { toast } from "react-toastify";

export const useContact = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //fetch all contact
  const getContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllContacts();
      console.log(data);
      setContact(data?.allContacts || null);
    } catch (error) {
      console.error("Error fetching contacts:", err);
      toast.error( "Failed to fetch contacts", {
        position: "top-right",
        autoClose: 3000,
      })
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };
  const addNewContact = async (name, walletAddress) => {
    try {
      const data = await addContacts(name, walletAddress);
      if (data?.contact) {
        setContact(data?.allContacts || []); // <- always array
      }
      toast.success( "Added to your contacts list", {
        position: "top-right",
        autoClose: 3000,
      });
      return data;
    } catch (err) {
      console.error("Error adding contact:", err);
      toast.error( "Failed to add contact", {
        position: "top-right",
        autoClose: 3000,
      })
      throw err;
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return { contact, loading, error, getContact, addNewContact };
};
