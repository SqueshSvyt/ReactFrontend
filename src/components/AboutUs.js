import React from 'react';
import styled from 'styled-components';
import aboutUsImage from '../assets/images/about_us.jpg';
import creator1Image from '../assets/images/Creator1.jfif';
import creator2Image from '../assets/images/Creator2.jfif';
import creator3Image from '../assets/images/Creator3.jfif';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResponsiveWrapper = styled.div`
  width: 100%;
  max-width: 120px;
  margin-left: auto;
  margin-right: auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-left: -15px;
  margin-right: -15px;
`;

const Column = styled.div`
  flex: 0 0 calc(50% - 30px);
  max-width: calc(50% - 30px);
  margin: 0 15px 30px;
  
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const AboutUs = () => {
    return (
        <Container>
            <Row>
                <Column>
                    <h2>About Our Company</h2>
                    <p>Welcome to Playst, your ultimate destination for curated playlists and music exploration. We are dedicated to providing an immersive music experience that caters to all tastes and moods.</p>
                    <p>Our mission is to connect people through the power of music. We believe that music transcends boundaries and brings people together, regardless of their background or preferences.</p>
                    <p>At Playst, we value creativity, diversity, and inclusivity. We celebrate music in all its forms and strive to create a platform where everyone feels welcome and inspired.</p>
                </Column>
                <Column>
                    <ResponsiveWrapper>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={aboutUsImage} alt="About Us Image" />
                    </ResponsiveWrapper>
                </Column>
            </Row>
            <Row>
                <Column>
                    <h2>Our Team</h2>
                    <p>Behind Playlist is a passionate team of music enthusiasts, designers, and developers who share a common goal: to revolutionize the way people experience music.</p>
                    <p>Meet some of the key members of our team:</p>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Card>
                        <CardImage src={creator1Image} alt="Team Member 1" />
                        <CardBody>
                            <CardTitle>John Doe</CardTitle>
                            <CardText>Music Curator</CardText>
                        </CardBody>
                    </Card>
                </Column>
                <Column>
                    <Card>
                        <CardImage src={creator2Image} alt="Team Member 2" />
                        <CardBody>
                            <CardTitle>Jane Smith</CardTitle>
                            <CardText>UI/UX Designer</CardText>
                        </CardBody>
                    </Card>
                </Column>
                <Column>
                    <Card>
                        <CardImage src={creator3Image} alt="Team Member 3" />
                        <CardBody>
                            <CardTitle>Michael Johnson</CardTitle>
                            <CardText>Lead Developer</CardText>
                        </CardBody>
                    </Card>
                </Column>
            </Row>
        </Container>
    );
};

export default AboutUs;
