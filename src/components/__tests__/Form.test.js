import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png'
    }
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(<Form name='Lydia Miller-Jones' interviewers={interviewers}/>);
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an
          onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form
        name=''
        interviewers={interviewers}
        onSave={onSave} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it('can successfully save after trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const { getByText, getByAltText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText('Save'));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' }
    });

    fireEvent.click(getByAltText('Sylvia Palmer'));
    fireEvent.click(getByText('Save'));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);

    // ?????? had to pass 1 as second parameter to pass with interviewer selected validation active
    // if test is failing you may be passing a different id #, you can set back to null and deactivate
    // mandatory interviewer selection validation
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });

  it('calls onCancel and resets the input field', () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name='Lydia Mill-Jones'
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText('Save'));
  
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' }
    });
  
    fireEvent.click(getByText('Cancel'));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});