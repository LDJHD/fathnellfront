import React, { useState, useEffect } from 'react';
import { Upload, Eye, EyeOff, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import logo from "../../assets/logo.png";
import { getBanniereImageUrl } from "../../utils/imageUtils";

export default function GestionBannieres() {
    const [bannieres, setBannieres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    
    // États du formulaire
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        ordre: 1,
        image: null
    });

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Charger les bannières
    const chargerBannieres = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/v1/banniere/listall`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setBannieres(data.bannieres);
            } else {
                console.error('Erreur:', data.message);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des bannières:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        chargerBannieres();
    }, []);

    // Gérer l'upload d'une bannière
    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!formData.image) {
            alert('Veuillez sélectionner une image');
            return;
        }

        setUploading(true);
        
        try {
            const uploadData = new FormData();
            uploadData.append('image', formData.image);
            uploadData.append('titre', formData.titre);
            uploadData.append('description', formData.description);
            uploadData.append('ordre', formData.ordre);

            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/v1/banniere/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: uploadData
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Bannière ajoutée avec succès !');
                setFormData({ titre: '', description: '', ordre: 1, image: null });
                setShowUploadForm(false);
                chargerBannieres(); // Recharger la liste
            } else {
                alert('Erreur: ' + data.message);
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            alert('Erreur lors de l\'upload de la bannière');
        } finally {
            setUploading(false);
        }
    };

    // Activer/désactiver une bannière
    const toggleBanniere = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/v1/banniere/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    actif: !currentStatus
                })
            });

            const data = await response.json();
            
            if (data.success) {
                chargerBannieres(); // Recharger la liste
            } else {
                alert('Erreur: ' + data.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la mise à jour');
        }
    };

    // Supprimer une bannière
    const supprimerBanniere = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette bannière ?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/v1/banniere/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Bannière supprimée avec succès !');
                chargerBannieres(); // Recharger la liste
            } else {
                alert('Erreur: ' + data.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression');
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Bannières</h1>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
                >
                    <Plus className="w-4 h-4" />
                    Ajouter une bannière
                </button>
            </div>

            {/* Formulaire d'upload */}
            {showUploadForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
                    <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle bannière</h2>
                    <form onSubmit={handleUpload} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Titre (optionnel)
                                </label>
                                <input
                                    type="text"
                                    value={formData.titre}
                                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Titre de la bannière"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ordre d'affichage
                                </label>
                                <input
                                    type="number"
                                    value={formData.ordre}
                                    onChange={(e) => setFormData({...formData, ordre: parseInt(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    min="1"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description (optionnelle)
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Description de la bannière"
                                rows="3"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image de la bannière *
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Formats acceptés: JPG, PNG, GIF, WEBP. Taille max: 5MB
                            </p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                <Upload className="w-4 h-4" />
                                {uploading ? 'Upload en cours...' : 'Ajouter la bannière'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowUploadForm(false)}
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Liste des bannières */}
            <div className="bg-white rounded-lg shadow-md">
                {bannieres.length === 0 ? (
                    <div className="p-8 text-center">
                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune bannière</h3>
                        <p className="text-gray-500">Commencez par ajouter votre première bannière.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aperçu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Informations
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ordre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statut
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bannieres.map((banniere) => (
                                    <tr key={banniere.id}>
                                        <td className="px-6 py-4">
                                            <img
                                                src={getBanniereImageUrl(banniere.image_url, "https://placehold.co/400x200")}
                                                alt={banniere.titre || 'Bannière'}
                                                className="w-24 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                {banniere.titre && (
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {banniere.titre}
                                                    </div>
                                                )}
                                                {banniere.description && (
                                                    <div className="text-sm text-gray-500">
                                                        {banniere.description.length > 50 
                                                            ? banniere.description.substring(0, 50) + '...' 
                                                            : banniere.description}
                                                    </div>
                                                )}
                                                <div className="text-xs text-gray-400">
                                                    Ajoutée le {new Date(banniere.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {banniere.ordre}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                banniere.actif 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {banniere.actif ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleBanniere(banniere.id, banniere.actif)}
                                                    className={`p-2 rounded-lg transition ${
                                                        banniere.actif 
                                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    }`}
                                                    title={banniere.actif ? 'Désactiver' : 'Activer'}
                                                >
                                                    {banniere.actif ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => supprimerBanniere(banniere.id)}
                                                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}