import React from 'react';
import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importing jest-dom for custom matchers
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import axios from 'axios';

import {checkText, renderComponent} from "./App.test";

import ProfileCard from './components/Profile';


import RegisterForm from './components/RegisterForm';

import AboutUs from './components/AboutUs';


import Admin from './components/Admin_Panel';

import EditProfileForm from './components/EditProfile';

import AuthForm from './components/AuthForm';

import "./contexts/AuthContext";

jest.mock('axios');

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { title: 'Playlist 1', description: 'Description 1' },
            { title: 'Playlist 2', description: 'Description 2' }
        ]),
        ok: true,
    })
);

describe('HomePage', () => {
    test('renders list of playlists', async () => {
        const { getByText, getByAltText } = render(<HomePage />);

        // Wait for API call to complete and component to update
        await waitFor(() => {
            expect(getByText('Most Popular Playlists')).toBeInTheDocument();
        });
    });

    test('renders HomePage without errors', () => {
        renderComponent(HomePage);
        // No need to assert anything, the test passes if rendering doesn't throw an error
    });

    test('renders specific text in HomePage', () => {
        renderComponent(HomePage);
        checkText('Most Popular Playlists');
    });

    test('renders header', () => {
        render(<HomePage />);
        const headerElement = screen.getByText(/Most Popular Playlists/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('handles API error', async () => {
        // Mock fetch function to return an error response
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                json: () => Promise.resolve({}),
            })
        );
    });
});

describe('Footer', () => {
    test('renders footer content correctly', () => {
        render(<Footer />);

        // Check if "About Us" section is rendered
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('We are a passionate team dedicated to providing the best music experience for our users. Our mission is to curate the finest playlists that cater to all tastes and moods. Join us on our musical journey and discover the perfect soundtrack for every moment.')).toBeInTheDocument();

        // Check if "Contact Us" section is rendered
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('Address: 123 Shebchenka, Lviv, Ukrain')).toBeInTheDocument();
        expect(screen.getByText('Phone: +1 234 567890')).toBeInTheDocument();
        expect(screen.getByText('Email: playst@playst.corp.com')).toBeInTheDocument();

        // Check if copyright text is rendered
        expect(screen.getByText('© 2024 company. All rights reserved.')).toBeInTheDocument();
    });
});

describe('ProfileCard component', () => {
    it('renders profile details when user data is provided', () => {
        const user = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        const userPlaylists = [
            { id: 1, name: 'Playlist 1', description: 'Description 1' },
            { id: 2, name: 'Playlist 2', description: 'Description 2' },
        ];
        localStorage.setItem('user', JSON.stringify(user));

        render(<ProfileCard />);

        localStorage.removeItem('user');
    });

    it('renders edit button', () => {
        const user = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        localStorage.setItem('user', JSON.stringify(user));

        render(<ProfileCard />);

        expect(screen.getByText('Edit Profile')).toBeInTheDocument();

        localStorage.removeItem('user');
    });

    // Add more test cases as needed
});

describe('RegisterForm component', () => {
    it('renders all form fields', () => {
        render(<RegisterForm />);

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('updates form data when input values change', () => {
        render(<RegisterForm />);
        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
        expect(confirmPasswordInput.value).toBe('password123');
    });

    it('submits form data on button click', async () => {
        render(<RegisterForm />);
        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const registerButton = screen.getByText('Register');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

        fireEvent.click(registerButton);

    });

    // Add more test cases as needed
});

describe('AboutUs component', () => {
    it('renders company information correctly', () => {
        render(<AboutUs />);

        expect(screen.getByText('About Our Company')).toBeInTheDocument();
    });

    it('renders team information correctly', () => {
        render(<AboutUs />);

        expect(screen.getByText('Our Team')).toBeInTheDocument();
        expect(screen.getByText('Behind Playlist is a passionate team of music enthusiasts, designers, and developers who share a common goal: to revolutionize the way people experience music.')).toBeInTheDocument();
        expect(screen.getByText('Meet some of the key members of our team:')).toBeInTheDocument();
    });

    it('renders team members correctly', () => {
        render(<AboutUs />);

        expect(screen.getByAltText('Team Member 1')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Music Curator')).toBeInTheDocument();

        expect(screen.getByAltText('Team Member 2')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('UI/UX Designer')).toBeInTheDocument();

        expect(screen.getByAltText('Team Member 3')).toBeInTheDocument();
        expect(screen.getByText('Michael Johnson')).toBeInTheDocument();
        expect(screen.getByText('Lead Developer')).toBeInTheDocument();
    });

    // Add more test cases as needed
});

describe('Admin component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, username: 'user1', email: 'user1@example.com', is_superuser: false },
                { id: 2, username: 'user2', email: 'user2@example.com', is_superuser: true },
            ]
        });
    });

    it('renders user list correctly', async () => {
        render(<Admin />);

        await waitFor(() => {
            expect(screen.getByText('User List')).toBeInTheDocument();
            expect(screen.getByText('Username: user1')).toBeInTheDocument();
            expect(screen.getByText('Email: user1@example.com')).toBeInTheDocument();
            expect(screen.getByText('Superuser: No')).toBeInTheDocument();
            expect(screen.getByText('Username: user2')).toBeInTheDocument();
            expect(screen.getByText('Email: user2@example.com')).toBeInTheDocument();
            expect(screen.getByText('Superuser: Yes')).toBeInTheDocument();
        });
    });

    // Add more test cases as needed
});

describe('EditProfileForm component', () => {
    it('renders form fields correctly', () => {
        render(<EditProfileForm />);

        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    it('updates form data on input change', () => {
        render(<EditProfileForm />);

        const usernameInput = screen.getByLabelText('Username:');
        const emailInput = screen.getByLabelText('Email:');
        const firstNameInput = screen.getByLabelText('First Name:');
        const lastNameInput = screen.getByLabelText('Last Name:');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@example.com');
        expect(firstNameInput.value).toBe('John');
        expect(lastNameInput.value).toBe('Doe');
    });
});

jest.mock('./contexts/AuthContext', () => ({
    useAuth: () => ({
        login: jest.fn()
    })
}));

describe('AuthForm component', () => {
    it('renders login form correctly', () => {
        render(<AuthForm />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('updates form data on input change', () => {
        render(<AuthForm />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    it('submits form data on button click', async () => {
        render(<AuthForm />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);
    });

});
